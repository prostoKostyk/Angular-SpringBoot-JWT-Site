/*
 */
package com.example.clever.security.jwt;

import com.example.clever.GlobalVariables;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

/**
*Kласс реализующий интерфейс AuthenticationEntryPoint
*и переопределяющий метод commence() чтобы ловить
*ошибку аутентификации.
* @since 1.0
*/
@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {

    /**
    *Логгер для вывода ошибок.
    */
    private static final Logger LOGGER = LoggerFactory.getLogger(AuthEntryPointJwt.class);

    @Override
    public void commence(final HttpServletRequest request,
                         final HttpServletResponse response,
                         final AuthenticationException authException)
                         throws IOException, ServletException {
        LOGGER.error("Unauthorized error: {}", authException.getMessage());
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, GlobalVariables.UNAUTH_ERROR);
    }
}
