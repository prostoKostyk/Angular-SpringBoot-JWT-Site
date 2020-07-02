/*
 */
package com.example.clever.security.services;

import com.example.clever.GlobalVariables;
import com.example.clever.controller.UserController;
import com.example.clever.model.UserModel;
import com.example.clever.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
*Kласс реализующий интерфейс UserDetailsService и
*переопределяющий метод loadUserByUsername(), который
*возвращает объект UserDetails, который используется
*для аутентификации.
* @since 1.0
*/
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    /**
    *Репозиторий для операций с пользователями.
    */
    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
        final UserModel user = this.userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException(GlobalVariables.USERNOTFOUND_ERROR + username));
        if (user == null)  {
            return null;
        }
        return UserController.build(user);
    }
}
