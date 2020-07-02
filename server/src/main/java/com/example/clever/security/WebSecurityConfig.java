/*
 */
package com.example.clever.security;

import com.example.clever.security.jwt.AuthEntryPointJwt;
import com.example.clever.security.jwt.AuthTokenFilter;
import com.example.clever.security.jwt.JwtUtils;
import com.example.clever.security.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
*Kласс расширяющий WebSecurityConfigurerAdapter определяющий
*AuthTokenFilter и какой используется обработчик исключений AuthEntryPointJwt.
* @since 1.0
*/
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    /**
    *Сервис реализующий интерфейс UserDetailsService и
    *переопределяющий метод loadUserByUsername().
    */
    private final UserDetailsServiceImpl userDetailsService;

    /**
    *Сервис реализующий интерфейс AuthenticationEntryPoint
    *и переопределяющий метод commence().
    */
    private final AuthEntryPointJwt unauthorizedHandler;

    /**
    *Сервис для для генерации и проверки JWT токенов.
    */
    private final JwtUtils jwtutils;

    /**
    *Конструктор для класса WebSecurityConfig.
    *@param userDetailsService Сервис реализующий интерфейс UserDetailsService
    *и переопределяющий метод loadUserByUsername().
    *@param unauthorizedHandler Сервис реализующий интерфейс
    *AuthenticationEntryPoint и переопределяющий метод commence().
    *@param jwtutils Сервис для для генерации и проверки JWT токенов.
    */
    @Autowired
    public WebSecurityConfig(final UserDetailsServiceImpl userDetailsService,
                             final AuthEntryPointJwt unauthorizedHandler,
                             final JwtUtils jwtutils) {
        this.userDetailsService = userDetailsService;
        this.unauthorizedHandler = unauthorizedHandler;
        this.jwtutils = jwtutils;
    }

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter(this.userDetailsService, this.jwtutils);
    }

    @Override
    public void configure(final AuthenticationManagerBuilder authmanager) throws Exception {
        authmanager.userDetailsService(this.userDetailsService)
            .passwordEncoder(WebSecurityConfig.passwordEncoder());
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    /**
    *Метод для кодирования пароля.
    *@return BCryptPasswordEncoder
    */
    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(final HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable().exceptionHandling()
        .authenticationEntryPoint(this.unauthorizedHandler)
        .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and().authorizeRequests()
        .antMatchers("/**").permitAll()
        .anyRequest().authenticated();
        http.addFilterBefore(
            this.authenticationJwtTokenFilter(),
            UsernamePasswordAuthenticationFilter.class
        );
    }
}
