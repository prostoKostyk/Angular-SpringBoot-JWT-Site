package com.example.clever.controller;

import com.example.clever.GlobalVariables;
import com.example.clever.model.AuthModel;
import com.example.clever.model.MessageModel;
import com.example.clever.controller.service.EmailSenderService;
import com.example.clever.model.ConfirmationToken;
import com.example.clever.model.LoginModel;
import com.example.clever.model.RoleModel;
import com.example.clever.model.SignupModel;
import com.example.clever.model.UserModel;
import com.example.clever.model.UserRole;
import com.example.clever.repository.ConfirmationTokenRepository;
import com.example.clever.repository.RoleRepository;
import com.example.clever.repository.UserRepository;
import com.example.clever.security.jwt.JwtUtils;
import com.example.clever.security.services.UserDetailsImpl;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
*Kласс авторизации, регистрации и восстановления
*пароля.
* @since 1.0
*/
@CrossOrigin(origins = "*")
@RestController
public class AuthController {

    /**
    *Сервис для для аутентификации пользователей.
    */
    private final AuthenticationManager authmanager;

    /**
    *Репозиторий для операций с пользователями.
    */
    private final UserRepository userRepository;

    /**
    *Репозиторий для операций с ролями.
    */
    private final RoleRepository roleRepository;

    /**
    *Сервис для кодирования паролей.
    */
    private final PasswordEncoder passwordEncoder;

    /**
    *Сервис для для генерации, анализа и проверки
    *JWT токенов.
    */
    private final JwtUtils jwtutils;

    /**
    *Сервис для отправки писем на эл. почту.
    */
    private final EmailSenderService emailSender;

    /**
    *Репозиторий для операций с токенами.
    */
    private final ConfirmationTokenRepository confirmationTokenRepository;

    /**
    *Конструктор для класса AuthController.
    *@param authmanager Сервис для для аутентификации
    *пользователей.
    *@param userRepository Репозиторий для операций с пользователями
    *@param roleRepository Репозиторий для операций с ролями.
    *@param passwordEncoder Сервис для кодирования паролей.
    *@param jwtutils Сервис для для генерации, анализа и
    *проверки JWT токенов.
    *@param emailSender Сервис для отправки писем на эл. почту.
    *@param confirmationTokenRepository Репозиторий для операций с токенами.
    */
    @Autowired
    public AuthController(final AuthenticationManager authmanager,
                          final UserRepository userRepository,
                          final RoleRepository roleRepository,
                          final PasswordEncoder passwordEncoder,
                          final JwtUtils jwtutils,
                          final EmailSenderService emailSender,
                          final ConfirmationTokenRepository confirmationTokenRepository) {
        this.authmanager = authmanager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtutils = jwtutils;
        this.emailSender = emailSender;
        this.confirmationTokenRepository = confirmationTokenRepository;
    }

    /**
    *Метод авторизации.
    *@param loginRequest Логин и пароль
    *@return Возвращает данные авторизированного
    *пользователя и jwt токен
    */
    @RequestMapping(value = { "/signin" }, method = RequestMethod.POST)
    public ResponseEntity<?> authenticateUser(final @Valid @RequestBody LoginModel loginRequest) {
        final Authentication authentication = this.authmanager.authenticate(
                new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(), loginRequest.getPassword()
                ));
        final String jwt = this.jwtutils.generateJwtToken(authentication);
        final UserDetailsImpl userdetails = (UserDetailsImpl) authentication.getPrincipal();
        final List<String> roles = userdetails.getAuthorities().stream().map(
            item -> item.getAuthority()
            ).collect(Collectors.toList());
        return AuthController.sendAuthModel(jwt, userdetails, roles);
    }

    /**
    *Метод для создания объекта AuthModel.
    *@param jwt Токен
    *@param userdetails Данные пользователя
    *@param roles Роли
    *@return Объект AuthModel
    */
    private static ResponseEntity<?> sendAuthModel(final String jwt,
                                                   final UserDetailsImpl userdetails,
                                                   final List<String> roles) {
        return ResponseEntity.ok(new AuthModel(
        jwt, userdetails.getId(), userdetails.getUsername(), userdetails.getfirstname(), userdetails.getsecondname(),
        userdetails.getlastname(), userdetails.getphonenumber(), userdetails.getEmail(), roles
        ));
    }

    /**
    *Метод регистриции.
    *@param signupRequest
    *Логин, имя, фамилия, отчество, телефон, email, пароль
    *@return
    *При неуспешной регистрации Возвращает исключение,
    *при успешной сообщение об успешной регистрации
    */
    @RequestMapping(value = { "/signup" }, method = RequestMethod.POST)
    public ResponseEntity<?> registerUser(final @Valid @RequestBody SignupModel signupRequest) {
        final ResponseEntity<?> response;
        if (this.userRepository.existsByUsername(signupRequest.getUsername())) {
            response = ResponseEntity.badRequest().body(new MessageModel(GlobalVariables.LOGINTAKEN_ERROR));
        } else if (this.userRepository.existsByEmail(signupRequest.getEmail())) {
            response = ResponseEntity.badRequest().body(new MessageModel(GlobalVariables.EMAILTAKEN_ERROR));
        } else {
            final UserModel user = new UserModel(signupRequest.getUsername(),
                                                 signupRequest.getfirstname(),
                                                 signupRequest.getsecondname(),
                                                 signupRequest.getlastname(),
                                                 signupRequest.getphonenumber(),
                                                 signupRequest.getEmail(),
                                                 this.passwordEncoder.encode(signupRequest.getPassword()));
            final Set<String> strroles = signupRequest.getRole();
            final Set<RoleModel> roles = new HashSet<>();
            if (strroles == null) {
                final RoleModel userrole = this.roleRepository.findByName(UserRole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException(GlobalVariables.ROLENOTFOUND_ERROR));
                roles.add(userrole);
            } else {
                strroles.forEach(
                    role -> {
                        if (role.equals("admin")) {
                            final RoleModel adminrole = this.roleRepository.findByName(UserRole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException(GlobalVariables.ROLENOTFOUND_ERROR));
                            roles.add(adminrole);
                        } else {
                            final RoleModel userrole = this.roleRepository.findByName(UserRole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException(GlobalVariables.ROLENOTFOUND_ERROR));
                            roles.add(userrole);
                        }
                    });
            }
            user.setRoles(roles);
            this.userRepository.save(user);
            response = ResponseEntity.ok(new MessageModel(GlobalVariables.REGISTRSUCCESS_MESSAGE));
        }
        return response;
    }

    // Восстановления пароля.

    /**
    *Метод для создания токена для восстановления пароля, сохранения в БД и отправки пользователю если
    *пользователь с указанным email зарегистрирован.
    *@param user Данные пользователя (email).
    *@return Возвращает данные пользователя (email).
    */
    @RequestMapping(value = "/forgot-password", method = RequestMethod.POST)
    public UserModel forgotUserPassword(final @Valid @RequestBody UserModel user) {
        final UserModel existinguser = this.userRepository.findByEmail(user.getEmail());
        if (existinguser != null) {
            final ConfirmationToken confirmationToken = new ConfirmationToken(existinguser);
            this.confirmationTokenRepository.save(confirmationToken);
            this.emailSender.sendEmail(existinguser, confirmationToken);
        }
        return user;
    }

    /**
    *Метод для подтверждения токена.
    *@param confirmationToken Токен
    *@return Возвращает данные пользователя для дальнейшего изменения пароля
    *если токен верный и null если токен неверный
    */
    @RequestMapping(value = "confirm-reset", method = { RequestMethod.GET, RequestMethod.POST })
    public UserModel validateResetToken(final @RequestParam("token") String confirmationToken) {
        UserModel user = null;
        final ConfirmationToken token = this.confirmationTokenRepository.findByconfirmationToken(confirmationToken);
        if (token != null) {
            user = this.userRepository.findByEmail(token.getUser().getEmail());
            // this.userRepository.save(user);
        }
        return user;
    }

    /**
    *Метод для изменения пароля.
    *@param user - данные пользователя (email и пароль)
    *@return Возвращает данные пользователя
    */
    @RequestMapping(value = "/reset-password", method = RequestMethod.POST)
    public UserModel resetUserPassword(final @Valid @RequestBody UserModel user) {
        if (user.getEmail() != null) {
            final UserModel tokenuser = this.userRepository.findByEmail(user.getEmail());
            tokenuser.setPassword(this.passwordEncoder.encode(user.getPassword()));
            this.userRepository.save(tokenuser);
        }
        return user;
    }
}
