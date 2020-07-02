/*
 */
package com.example.clever.security.jwt;

import com.example.clever.GlobalVariables;
import com.example.clever.security.services.UserDetailsServiceImpl;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

/**
*Kласс расщиряющий OncePerRequestFilter и
*переопределяющия doFilterInternal().
* @since 1.0
*/
public class AuthTokenFilter extends OncePerRequestFilter {

    /**
    *Логгер для вывода ошибок.
    */
    private static final Logger LOGGER = LoggerFactory.getLogger(AuthTokenFilter.class);

    /**
    *Сервис для для генерации, анализа и проверки
    *JWT токенов.
    */
    private final JwtUtils jwtutils;

    /**
    *Сервис для загрузки пользователя по
    *логину.
    */
    private final UserDetailsServiceImpl userDetailsService;

    /**
    *Конструктор для класса AuthTokenFilter.
    *@param userDetailsServicel сервис UserDetailsServiceImpl
    *@param jwtutilsl сервис JwtUtils
    */
    @Autowired
    public AuthTokenFilter(final UserDetailsServiceImpl userDetailsServicel,
                           final JwtUtils jwtutilsl) {
        this.userDetailsService = userDetailsServicel;
        this.jwtutils = jwtutilsl;
    }

    /**
    *Метод, запускающийся при каждом запросе, для проверки JWT, выделения из
    *него логина пользователя и установления текущего UserDetails.
    *@param request Запрос
    *@param response Ответ
    *@param filterchain
    *@throws ServletException если происходит Servlet ошибка
    *@throws IOException если происходит IO ошибка
    */
    protected void doFilterInternal(final HttpServletRequest request,
                                    final HttpServletResponse response,
                                    final FilterChain filterchain)
            throws ServletException, IOException {
        try {
            final String jwt = AuthTokenFilter.parseJwt(request);
            if (jwt != null && this.jwtutils.validateJwtToken(jwt)) {
                final String username = this.jwtutils.getUserNameFromJwtToken(jwt);
                final UserDetails userdetails = this.userDetailsService.loadUserByUsername(username);
                final UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                    userdetails, null, userdetails.getAuthorities()
                    );
                authentication.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (final Exception excep) {
            LOGGER.error(GlobalVariables.UNAUTH_ERROR, excep);
        }
        filterchain.doFilter(request, response);
    }

    /**
    *Метод для получения jwt токена в запросе и
    *отбрасывания Bearer от токена.
    *@param request Токен
    *@return Возвращает jwt токен без Bearer или null
    *если jwt не было в запросе
    */
    private static String parseJwt(final HttpServletRequest request) {
        final String headerauth = request.getHeader("Authorization");
        String token = null;
        if (StringUtils.hasText(headerauth) && headerauth.startsWith("Bearer ")) {
            token = headerauth.substring(GlobalVariables.VALUE_OF_BEARLEN_SIZE, headerauth.length());
        }
        return token;
    }
}
