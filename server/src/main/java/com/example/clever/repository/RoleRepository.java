/*
 */
package com.example.clever.repository;

import com.example.clever.model.RoleModel;
import com.example.clever.model.UserRole;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
*Репозиторий RoleRepository.
* @since 1.0
*/
@Repository
public interface RoleRepository extends JpaRepository<RoleModel, Long> {
    /**
    *Поиск ролей по названию.
    *@param name Название роли
    *@return Возвращает Optional c найденными ролями
    */
    Optional<RoleModel> findByName(UserRole name);
}
