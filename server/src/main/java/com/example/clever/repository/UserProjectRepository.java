/*
 */
package com.example.clever.repository;

import com.example.clever.model.UserProjectModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
*Репозиторий UserProjectRepository.
* @since 1.0
*/
@Repository
public interface UserProjectRepository extends JpaRepository<UserProjectModel, Long> {
}
