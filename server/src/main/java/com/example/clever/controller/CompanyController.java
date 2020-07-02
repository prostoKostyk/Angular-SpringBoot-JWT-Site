/*
 */
package com.example.clever.controller;

import com.example.clever.GlobalVariables;
import com.example.clever.exception.ResourceNotFoundException;
import com.example.clever.model.CompanyModel;
import com.example.clever.model.UserCompanyModel;
import com.example.clever.repository.CompanyRepository;
import com.example.clever.repository.UserCompanyRepository;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
*Kласс c запросами к таблице Компании.
* @since 1.0
*/
@CrossOrigin(origins = "*")
@RestController
public class CompanyController {
    /**
    *Репозиторий для операций с компаниями.
    */
    private final CompanyRepository companyRepository;

    /**
    *Репозиторий для операций с пользователями.
    */
    private final UserCompanyRepository userCompanyRepository;

    /**
     *Конструктор для класса CompanyController.
     *@param companyRepository Репозиторий для операций с компаниями.
     *@param userCompanyRepository Репозиторий для операций с
     *пользователями.
     */
    @Autowired
    public CompanyController(final CompanyRepository companyRepository,
                             final UserCompanyRepository userCompanyRepository) {
        this.companyRepository = companyRepository;
        this.userCompanyRepository = userCompanyRepository;
    }

    /**
    *Метод для получения всех компаний.
    *@param pageable Интерфейс для пагинации
    *@return
    *Возвращает данные о компаниях
    */
    @RequestMapping(value = { "/companies" }, method = RequestMethod.GET)
    public Page<CompanyModel> getCompanies(final Pageable pageable) {
        return this.companyRepository.findAll(pageable);
    }

    /**
    *Метод для получения компании по id.
    *@param companyid
    *Id компании.
    *@return
    *Возвращает данные о компании
    */
    @RequestMapping(value = { "/companies/{companyid}" }, method = RequestMethod.GET)
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public Optional<CompanyModel> getCompany(final @PathVariable Long companyid) {
        return this.companyRepository.findById(companyid);
    }

    /**
    *Метод для создания новой компании.
    *@param company
    *Данные новой компании
    *@return
    *Возвращает данные о созданной компании
    */
    @RequestMapping(value = { "/companies" }, method = RequestMethod.POST)
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public CompanyModel createCompany(final @Valid @RequestBody CompanyModel company) {
        return this.companyRepository.save(company);
    }

    /**
    *Метод для изменения существующей компании.
    *@param companyid Id изменяемой компании
    *@param companyRequest Данные для изменения компании
    *@return *Возвращает данные изменённой компании
    *или исключение о том, что компания не найдена
    */
    @RequestMapping(value = { "/companies/{companyid}" }, method = RequestMethod.PUT)
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public CompanyModel updateCompany(final @PathVariable Long companyid,
                                      final @Valid @RequestBody CompanyModel companyRequest) {
        return this.companyRepository.findById(companyid).map(
            company -> {
                company.setName(companyRequest.getName());
                company.setForm(companyRequest.getForm());
                company.setDescription(companyRequest.getDescription());
                company.setFoundationDate(companyRequest.getFoundationDate());
                return this.companyRepository.save(company);
            }).orElseThrow(() -> new ResourceNotFoundException(GlobalVariables.COMPANYNOTFOUND_ERROR + companyid)
                );
    }

    /**
    *Метод для удаления существующей компании.
    *@param companyid
    *Id удаляемой компании
    *@return Если компания с id не найдена Возвращает
    *исключение с сообщением о ненайденной компании.
    */
    @RequestMapping(value = { "/companies/{companyid}" }, method = RequestMethod.DELETE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteCompany(final @PathVariable Long companyid) {
        return this.companyRepository.findById(companyid).map(
            company -> {
                this.companyRepository.delete(company);
                return ResponseEntity.ok().build();
            }).orElseThrow(() -> new ResourceNotFoundException(GlobalVariables.COMPANYNOTFOUND_ERROR + companyid)
            );
    }

    /**
    *Метод для получения всех отоношений
    *пользователь-компания.
    *@param pageable Интерфейс для пагинации
    *@return
    *Возвращает отношения.
    */
    @RequestMapping(value = { "/users_companies" }, method = RequestMethod.GET)
    @PreAuthorize("hasRole('ADMIN')")
    public Page<UserCompanyModel> getUsersCompanies(final Pageable pageable) {
        return this.userCompanyRepository.findAll(pageable);
    }

    /**
    *Метод для создания отоношения
    *пользователь-компания.
    *@param usercompany
    *Id пользователя и id компании
    *@return
    *Возвращает созданное отношение
    */
    @RequestMapping(value = { "/users_companies" }, method = RequestMethod.POST)
    @PreAuthorize("hasRole('ADMIN')")
    public UserCompanyModel createUserCompany(final @Valid @RequestBody UserCompanyModel usercompany) {
        return this.userCompanyRepository.save(usercompany);
    }

    /**
    *Метод для изменения отоношения пользователь-компания.
    *@param usercompanyid Id изменяемого отношения
    *@param usercompreq Id пользователя и id компании для изменения
    *@return Возвращает изменённое отношение или исключение
    *о том, что отношение не найдено
    */
    @RequestMapping(value = { "/users_companies/{usercompanyid}" }, method = RequestMethod.PUT)
    @PreAuthorize("hasRole('ADMIN')")
    public UserCompanyModel updateUserCompany(final @PathVariable Long usercompanyid,
                                              final @Valid @RequestBody UserCompanyModel usercompreq) {
        return this.userCompanyRepository.findById(usercompanyid).map(
            usercompany -> {
                usercompany.setCompanyid(usercompreq.getCompanyid());
                usercompany.setUserid(usercompreq.getUserid());
                return this.userCompanyRepository.save(usercompany);
            }).orElseThrow(() -> new ResourceNotFoundException(GlobalVariables.COMPANYNOTFOUND_ERROR + usercompanyid));
    }

    /**
    *Метод для удаления отоношения пользователь-компания.
    *@param usercompanyid Id удаляемого отношения
    *@return Возвращает исключение о том, что отношение
    *не найдено если отношение с данным id не существует
    */
    @RequestMapping(value = { "/users_companies/{usercompanyid}" }, method = RequestMethod.DELETE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUserCompany(final @PathVariable Long usercompanyid) {
        return this.userCompanyRepository.findById(usercompanyid).map(
            usercompany -> {
                this.userCompanyRepository.delete(usercompany);
                return ResponseEntity.ok().build();
            }).orElseThrow(() -> new ResourceNotFoundException(GlobalVariables.COMPANYNOTFOUND_ERROR + usercompanyid)
            );
    }
}

