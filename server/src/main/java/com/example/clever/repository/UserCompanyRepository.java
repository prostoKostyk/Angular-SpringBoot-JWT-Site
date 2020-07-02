/*
 */
package com.example.clever.repository;

import com.example.clever.model.UserCompanyModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
*Репозиторий UserCompanyRepository.
* @since 1.0
*/
@Repository
public interface UserCompanyRepository extends JpaRepository<UserCompanyModel, Long> {
}
