/*
 */
package com.example.clever.controller;

import com.example.clever.GlobalVariables;
import com.example.clever.exception.ResourceNotFoundException;
import com.example.clever.model.ExperienceModel;
import com.example.clever.model.UserModel;
import com.example.clever.repository.ExperienceRepository;
import com.example.clever.repository.UserRepository;

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
*Kласс c запросами к таблице Опыт.
* @since 1.0
*/
@CrossOrigin(origins = "*")
@RestController
public class ExperienceController {
    /**
    *Репозиторий для операций с опытом.
    */
    private final ExperienceRepository experienceRepository;
    /**
    *Репозиторий для операций с пользователям.
    */
    private final UserRepository userRepository;

    @Autowired
    public ExperienceController(final ExperienceRepository experienceRepository,
                                final UserRepository userRepository) {
        this.experienceRepository = experienceRepository;
        this.userRepository = userRepository;
    }

    /**
     *Метод для получения всех записей об опыте работы пользователя.
     *@param pageable Интерфейс для пагинации
     *@return Возвращает данные об опыте работы пользовател
     */
    @RequestMapping(value = { "/experiences" }, method = RequestMethod.GET)
    @PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
    public Page<ExperienceModel> getExperiences(final Pageable pageable) {
        return this.experienceRepository.findAll(pageable);
    }

    /**
     *Метод для получения записи об опыте работы пользователя по id.
     *@param experienceid Id записи об опыте работы пользователя
     *@return Возвращает данные об опыте работы пользователя
     */
    @RequestMapping(value = { "/experiences/{experienceid}" }, method = RequestMethod.GET)
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public Optional<ExperienceModel> getUser(final @PathVariable Long experienceid) {
        return this.experienceRepository.findById(experienceid);
    }

    /**
     *Метод для получения записи об опыте работы по пользователю по id.
     *@param userId Id записи об опыте работы пользователя
     *@return Возвращает данные об опыте работы пользователя
     */
    @RequestMapping(value = { "/experience_user/{userId}" }, method = RequestMethod.GET)
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public Page<ExperienceModel> getExperienceByUser(final @PathVariable Long userId,
                                                     final Pageable pageable) {
        Optional<UserModel> user = this.userRepository.findById(userId);
        return this.experienceRepository.findByUser(user, pageable).map(
            experience -> {
                final ExperienceModel experienceData = new ExperienceModel();
                experienceData.setId(experience.getId());
                experienceData.setCompany(experience.getCompany());
                experienceData.setPosition(experience.getPosition());
                experienceData.setBeginningdate(experience.getBeginningdate());
                experienceData.setEnddate(experience.getEnddate());
                experienceData.setExperiencemonths(experience.getExperiencemonths());
                return experienceData;
            });
    }

    /**
     *Метод для создания новой записи об опыте работы пользователя.
     *@param experience Данные новой записи об опыте работы пользователя
     *@return Возвращает данные записи об опыте работы пользователя
     */
    @RequestMapping(value = { "/experiences" }, method = RequestMethod.POST)
    @PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
    public ExperienceModel createExperience(final @Valid @RequestBody ExperienceModel experience) {
        return this.experienceRepository.save(experience);
    }

    /**
     *Метод для изменения существующей записи об опыте работы пользователя.
     *@param experid Id изменяемой записи об опыте работы пользователя
     *@param experienceRequest Данные для изменения записи об опыте работы пользователя
     *@return Возвращает данные изменённой записи об опыте работы пользователя или исключение о том,
     *что запись не найдена
     */
    @RequestMapping(value = { "/experiences/{experienceid}" }, method = RequestMethod.PUT)
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ExperienceModel updateExperience(final @PathVariable Long experid,
                                            final @Valid @RequestBody ExperienceModel experienceRequest) {
        return this.experienceRepository.findById(experid).map(
            experience -> {
                experience.setCompany(experienceRequest.getCompany());
                experience.setPosition(experienceRequest.getPosition());
                experience.setBeginningdate(experienceRequest.getBeginningdate());
                experience.setEnddate(experienceRequest.getEnddate());
                experience.setExperiencemonths(experienceRequest.getExperiencemonths());
                return this.experienceRepository.save(experience);
            }).orElseThrow(() ->
            new ResourceNotFoundException(GlobalVariables.RELATIONOTFOUND_ERROR + experid));
    }

    /**
    *Метод для удаления записи об опыте работы пользователя.
    *@param experienceid Id записи об опыте работы пользователя
    *@return Если запись с id не найдена Возвращает исключение с сообщением о ненайденной записи
    */
    @RequestMapping(value = { "/experiences/{experienceid}" }, method = RequestMethod.DELETE)
    @PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
    public ResponseEntity<?> deleteExperience(final @PathVariable Long experienceid) {
        return this.experienceRepository.findById(experienceid).map(
            experience -> {
                this.experienceRepository.delete(experience);
                return ResponseEntity.ok().build();
            }).orElseThrow(() -> new ResourceNotFoundException(
            GlobalVariables.RELATIONOTFOUND_ERROR + experienceid
            ));
    }
}
