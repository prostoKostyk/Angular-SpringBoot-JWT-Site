/*
 */
package com.example.clever.controller.service;

import com.example.clever.GlobalVariables;
import com.example.clever.model.ConfirmationToken;
import com.example.clever.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
*Kласс для создания и отправки писем
*на электронную почту.
* @since 1.0
*/
@Service
public class EmailSenderService {
    /**
    *Сервис для отправки писем.
    */
    private final JavaMailSender javaMailSennder;

    /**
    *Конструктор для класс EmailSenderService.
    *@param javaMailSennder Сервис для отправки писем.
    */
    @Autowired
    public EmailSenderService(final JavaMailSender javaMailSennder) {
        this.javaMailSennder = javaMailSennder;
    }

    /**
     *Метод для отправки электронного письма с ссылкой
     *восстановления пароля указанному пользователю.
     *
     *@param user
     *Пользователь, которому отправляется письмо
     *@param confirmationToken
     *Токен
     */
    @Async
    public void sendEmail(final UserModel user,
                          final ConfirmationToken confirmationToken) {
        final SimpleMailMessage mailmessage = new SimpleMailMessage();
        mailmessage.setTo(user.getEmail());
        mailmessage.setSubject(GlobalVariables.VALUE_OF_MAILSUBJECT);
        mailmessage.setFrom(GlobalVariables.VALUE_OF_MAILFROM);
        mailmessage.setText(
            GlobalVariables.VALUE_OF_MAILTEXT
            + GlobalVariables.VALUE_OF_MAILURL
            + confirmationToken.getConfirmationToken()
        );
        this.javaMailSennder.send(mailmessage);
    }
}
