/*
 */
package com.example.clever.repository;

import com.example.clever.model.ConfirmationToken;
import org.springframework.data.repository.CrudRepository;

/**
 *Репозиторий ConfirmationTokenRepository.
 * @since 1.0
 */
public interface ConfirmationTokenRepository extends CrudRepository<ConfirmationToken, String> {
    /**
    *Поиск токенов.
    *@param confirmationToken Токен
    *@return Возвращает ConfirmationToken confirmToken
    */
    ConfirmationToken findByconfirmationToken(String confirmationToken);
}
