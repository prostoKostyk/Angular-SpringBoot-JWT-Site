/*
 */
package com.example.clever.controller;

import com.example.clever.GlobalVariables;
import com.example.clever.exception.ResourceNotFoundException;
import com.example.clever.model.CompanyModel;
import com.example.clever.model.ProjectModel;
import com.example.clever.model.UserModel;
import com.example.clever.repository.CompanyRepository;
import com.example.clever.repository.ProjectRepository;
import com.example.clever.repository.UserRepository;
import com.example.clever.security.services.UserDetailsImpl;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
*Kласс c запросами к таблице Пользователи.
* @since 1.0
*/
@CrossOrigin(origins = "*")
@RestController
public class UserController {
    /**
    *Репозиторий для операций с пользователями.
    */
    private final UserRepository userRepository;

    /**
    *Репозиторий для операций с проектами.
    */
    private final ProjectRepository projectRepository;

    /**
    *Репозиторий для операций с компаниями.
    */
    private final CompanyRepository companyRepository;

    /**
    *Конструктор для класса UserController.
    *@param userRepository Репозиторий для операций с
    *пользователями.
    *@param projectRepository Репозиторий для операций с проектами.
    *@param companyRepository Репозиторий для операций с компаниями.
    */
    @Autowired
    public UserController(final UserRepository userRepository,
                          final ProjectRepository projectRepository,
                          final CompanyRepository companyRepository) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.companyRepository = companyRepository;
    }

    /**
     *Метод для получения всех пользователей.
     *@param pageable Интерфейс для пагинации
     *@return Возвращает данные о пользователях
     */
    @RequestMapping(value = { "/users" }, method = RequestMethod.GET)
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public Page<UserModel> getUsers(final Pageable pageable) {
        return this.userRepository.findAll(pageable);
    }

    /**
     *Метод для получения пользователя по id.
     *@param userid Id пользователя
     *@return Возвращает данные о пользователе
     */
    @RequestMapping(value = { "/user/{userid}" }, method = RequestMethod.GET)
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public Optional<UserModel> getUser(final @PathVariable Long userid) {
        return this.userRepository.findById(userid);
    }

    /**
     *Метод для получения ФИО пользователя с
     *указанным проектом.
     *@param pageable Интерфейс для пагинации
     *@param projectid Id проекта
     *@return Возвращает строку с ФИО пользователя
     */
    @RequestMapping(value = { "/findusersbyproject/{projectid}" }, method = RequestMethod.GET)
    public Page<String> getUsersByProject(final Pageable pageable,
                                          final @PathVariable Long projectid) {
        return this.userRepository.findByProjects(this.projectRepository.findById(projectid), pageable).map(
            user -> {
                return user.getfirstname() + " " + user.getsecondname() + " " + user.getlastname();
            });
    }

    /**
     *Метод для получения пользователя с указанной
     *компанией.
     *@param pageable Интерфейс для пагинации
     *@param companyid Id компании
     *@return Возвращает найденного пользователя
     */
    @RequestMapping(value = { "/findusersbycompany/{companyid}" }, method = RequestMethod.GET)
    public Page<UserModel> getUsersByCompany(final Pageable pageable,
                                             final @PathVariable Long companyid) {
        return this.userRepository.findByCompany(this.companyRepository.findById(companyid), pageable).map(
            user -> {
                final UserModel userdata = new UserModel();
                userdata.setId(user.getId());
                userdata.setfirstname(user.getfirstname());
                userdata.setsecondname(user.getsecondname());
                userdata.setlastname(user.getlastname());
                return userdata;
            });
    }

    /**
     *Метод для получения всех проектов пользователя.
     *@param userid
     *Id пользователя
     *@return
     *Возвращает проекты пользователя
     */
    @RequestMapping(value = { "/users/getprojects/{userid}" }, method = RequestMethod.GET)
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public Set<ProjectModel> getProjects(final @PathVariable Long userid) {
        return this.userRepository.findById(userid).map(
            user -> {
                return user.getProjects();
            }).orElseThrow(() -> new ResourceNotFoundException(GlobalVariables.USERNOTFOUND_ERROR + userid));
    }

    /**
     *Метод для получения всех компаний пользователя.
     *@param userid
     *Id пользователя
     *@return
     *Возвращает компании пользователя
     */
    @RequestMapping(value = { "/users/getcompanies/{userid}" }, method = RequestMethod.GET)
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public Set<CompanyModel> getCompanies(final @PathVariable Long userid) {
        return this.userRepository.findById(userid).map(
            user -> {
                return user.getCompanies();
            }).orElseThrow(() -> new ResourceNotFoundException(GlobalVariables.USERNOTFOUND_ERROR + userid));
    }

    /**
    *Метод для создания нового пользователя.
    *@param user
    *Данные нового пользователя
    *@return
    *Возвращает данные нового пользователя
    */
    @RequestMapping(value = { "/users" }, method = RequestMethod.POST)
    public UserModel createUser(final @Valid @RequestBody UserModel user) {
        return this.userRepository.save(user);
    }

    /**
     *Метод для добавления существующего проекта указанному пользователю.
     *@param userid
     *Id пользователя
     *@param project
     *Поект
     *@return
     *Возвращает данные добавленного проекта
     */
    @RequestMapping(value = { "/users/add_existing_project/{userid}" }, method = RequestMethod.PUT)
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ProjectModel addExistingUserProject(final @PathVariable Long userid,
                                               final @Valid @RequestBody ProjectModel project) {
        return this.userRepository.findById(userid).map(
            user -> {
                user.getProjects().add(project);
                this.userRepository.save(user);
                return project;
            }).orElseThrow(() ->  new ResourceNotFoundException(GlobalVariables.USERNOTFOUND_ERROR + userid));
    }


    /**
     *Метод для добавления существующей компании указанному пользователю.
     *@param userid Id пользователя
     *@param company Компания
     *@return Возвращает данные добавленной компании
     */
    @RequestMapping(value = { "/users/add_existing_company/{userid}" }, method = RequestMethod.PUT)
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public CompanyModel addExistingUserCompany(final @PathVariable Long userid,
                                               final @Valid @RequestBody CompanyModel company) {
        return this.userRepository.findById(userid).map(
            user -> {
                user.getCompanies().add(company);
                this.userRepository.save(user);
                return company;
            }).orElseThrow(() -> new ResourceNotFoundException(GlobalVariables.USERNOTFOUND_ERROR + userid));
    }

    /**
     *Метод для создания и добавления нового проекта указанному пользователю.
     *@param userid
     *Id пользователя
     *@param project
     *Компания
     *@return
     *Возвращает данные добавленной проекта
     */
    @RequestMapping(value = { "/users/add_project/{userid}" }, method = RequestMethod.PUT)
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ProjectModel addUserProject(final @PathVariable Long userid,
                                       final @Valid @RequestBody ProjectModel project) {
        return this.userRepository.findById(userid).map(
            user -> {
                user.getProjects().addAll(Arrays.asList(this.projectRepository.save(project)));
                this.userRepository.save(user);
                return project;
            }).orElseThrow(() -> new ResourceNotFoundException(GlobalVariables.USERNOTFOUND_ERROR + userid));
    }

    /**
     *Метод для создания и добавления новой
     *компании указанному пользователю.
     *@param userid
     *Id пользователя
     *@param company
     *Компания
     *@return
     *Возвращает данные добавленной компании
     */
    @RequestMapping(value = { "/users/add_company/{userid}" }, method = RequestMethod.PUT)
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public UserModel addUserCompany(final @PathVariable Long userid,
                                    final @Valid @RequestBody CompanyModel company) {
        return this.userRepository.findById(userid).map(
            user -> {
                user.getCompanies().addAll(Arrays.asList(this.companyRepository.save(company)));
                return this.userRepository.save(user);
            }).orElseThrow(() ->  new ResourceNotFoundException(GlobalVariables.USERNOTFOUND_ERROR + userid));
    }

    /**
    *Метод для изменения существуюего.
    *@param userid
    *Id изменяемого пользователя
    *@param userrequest
    *Данные для изменения пользователя
    *@return
    *Возвращает данные изменённого пользователя
    */
    @RequestMapping(value = { "/users/{userid}" }, method = RequestMethod.PUT)
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public UserModel updateUser(final @PathVariable Long userid,
                                final @Valid @RequestBody UserModel userrequest) {
        return this.userRepository.findById(userid).map(
            user -> {
                user.setfirstname(userrequest.getfirstname());
                user.setsecondname(userrequest.getsecondname());
                user.setlastname(userrequest.getlastname());
                user.setphonenumber(userrequest.getphonenumber());
                user.setEmail(userrequest.getEmail());
                return this.userRepository.save(user);
            }).orElseThrow(() -> new ResourceNotFoundException(GlobalVariables.USERNOTFOUND_ERROR + userid));
    }

    /**
     *Метод для удаления пользователя.
     *@param userid
     *Id пользователя для удаления
     *@return Если пользователь с id не найдена возвращает
     *исключение с сообщением о ненайденной записи
     */
    @RequestMapping(value = { "/users/{userid}" }, method = RequestMethod.DELETE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(final @PathVariable Long userid) {
        return this.userRepository.findById(userid).map(
            user -> {
                this.userRepository.delete(user);
                return ResponseEntity.ok().build();
            }).orElseThrow(() -> new ResourceNotFoundException(GlobalVariables.USERNOTFOUND_ERROR + userid));
    }

    /**
     *Метод для конвертирования списка ролей
     *пользователя в список GrantedAuthority.
     *@param user пользователь
     *@return Возвращает UserDetailsImpl с
     *конвентированным списком ролей.
     */
    public static UserDetailsImpl build(final UserModel user) {
        final List<GrantedAuthority> authorities = user.getRoles().stream().map(
                role -> new SimpleGrantedAuthority(
                    role.getName().name()
                )).collect(
                    Collectors.toList()
                );
        return new UserDetailsImpl(
            user.getId(), user.getUsername(), user.getfirstname(), user.getsecondname(),
            user.getlastname(), user.getphonenumber(), user.getEmail(),
            user.getPassword(), authorities
            );
    }
}
