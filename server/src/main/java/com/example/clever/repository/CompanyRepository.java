/*
 */
package com.example.clever.repository;

import com.example.clever.model.CompanyModel;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
*Репозиторий CompanyRepository.
* @since 1.0
*/
@Repository
public interface CompanyRepository extends JpaRepository<CompanyModel, Long> {
    /**
    *Поиск компаний по имени.
    *@param name Название
    *@return Возвращает List с компаниями
    */
    List<CompanyModel> findByNameContaining(String name);
}
