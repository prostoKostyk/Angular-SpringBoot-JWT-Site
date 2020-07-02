/*
 */
package com.example.clever.security.jwt;

import com.example.clever.security.services.UserDetailsImpl;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

/**
*Сервис для для генерации и проверки JWT токенов.
* @since 1.0
*/
@Component
public class JwtUtils {

    /**
    *Логгер для вывода ошибок.
    */
    private static final Logger LOGGER = LoggerFactory.getLogger(JwtUtils.class);

    /**
    *Секретное слово для кодирования.
    */
    @Value("${example.app.jwtsecret}")
    private String jwtsecret;

    /**
    *Время действия токена в милисекундах.
    */
    @Value("${example.app.jwtexpms}")
    private int jwtexpms;

    /**
     *Метод для генерации JWT.
     *@param authentication Данные аутентифицированного
     *пользователя
     *@return
     *Возвращает JWT токен
     */
    public String generateJwtToken(final Authentication authentication) {
        final UserDetailsImpl userprincip = (UserDetailsImpl) authentication.getPrincipal();
        return Jwts.builder()
        .setSubject(userprincip.getUsername())
        .setIssuedAt(new Date())
        .setExpiration(new Date(new Date().getTime() + this.jwtexpms))
        .signWith(SignatureAlgorithm.HS512, this.jwtsecret)
        .compact();
    }

    /**
     *Метод выделения из JWT токена логина пользователя.
     *@param token
     *JWT токен
     *@return
     *Возвращает логин
     */
    public String getUserNameFromJwtToken(final String token) {
        return Jwts.parser().setSigningKey(this.jwtsecret)
        .parseClaimsJws(token).getBody().getSubject();
    }

    /**
    *Метод для проверки JWT токена.
    *@param authtoken
    *JWT токен.
    *@return
    *Возвращает true или false.
    */
    public boolean validateJwtToken(final String authtoken) {
        boolean parse;
        try {
            Jwts.parser().setSigningKey(this.jwtsecret).parseClaimsJws(authtoken);
            parse = true;
        } catch (final SignatureException except) {
            LOGGER.error("Invalid JWT signature: {}", except.getMessage());
            parse = false;
        } catch (final MalformedJwtException except) {
            LOGGER.error("Invalid JWT token: {}", except.getMessage());
            parse = false;
        } catch (final ExpiredJwtException except) {
            LOGGER.error("JWT token is expired: {}", except.getMessage());
            parse = false;
        } catch (final UnsupportedJwtException except) {
            LOGGER.error("JWT token is unsupported: {}", except.getMessage());
            parse = false;
        } catch (final IllegalArgumentException except) {
            LOGGER.error("JWT claims string is empty: {}", except.getMessage());
            parse = false;
        }
        return parse;
    }
}
