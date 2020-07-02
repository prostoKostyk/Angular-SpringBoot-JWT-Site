/*
 */
package com.example.clever.controller;

import com.example.clever.GlobalVariables;
import com.example.clever.exception.ResourceNotFoundException;
import com.example.clever.model.ProjectModel;
import com.example.clever.model.UserProjectModel;
import com.example.clever.repository.ProjectRepository;
import com.example.clever.repository.UserProjectRepository;
import com.example.clever.repository.UserRepository;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
*Kласс c запросами к таблице Проекты.
* @since 1.0
*/
@CrossOrigin(origins = "*")
@RestController
public class ProjectController {
    /**
    *Репозиторий для операций с пользователями.
    */
    private final UserRepository userRepository;

    /**
    *Репозиторий для операций с проектами.
    */
    private final ProjectRepository projectRepository;

    /**
    *Репозиторий для операций с отношениями
    *пользователь-проект.
    */
    private final UserProjectRepository userProjectRepository;

    /**
    *Конструктор для rкласса ProjectController.
    *@param projectRepository Репозиторий для операций с проектами.
    *@param userProjectRepository Репозиторий для операций с отношениями
    *пользователь-проект.
    *@param userRepository Репозиторий для операций с проектами.
    */
    @Autowired
    public ProjectController(final ProjectRepository projectRepository,
                             final UserProjectRepository userProjectRepository,
                             final UserRepository userRepository) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.userProjectRepository = userProjectRepository;
    }

    /**
     *Метод для получения всех проектов.
     *@param pageable Интерфейс для пагинации
     *@return
     *Возвращает данные о проектах
     */
    @RequestMapping(value = { "/projects" }, method = RequestMethod.GET)
    public Page<ProjectModel> getProjects(final Pageable pageable) {
        return this.projectRepository.findAll(pageable);
    }

    /**
     *Метод для получения пагинированного списка
     *проектов.
     *@param pageno Номер страницы
     *@param pagesize Размер страницы
     *@param sortby Поле для сортировки
     *@return Возвращает пагинированный список
     *пользователей
     */
    @RequestMapping(value = { "/projects/pagination/{pageno}/{pagesize}/{sortby}" },
        method = RequestMethod.GET)
    public Page<ProjectModel> getProjectsPage(final @PathVariable int pageno,
                                              final @PathVariable int pagesize,
                                              final @PathVariable String sortby) {
        final Pageable pageable = PageRequest.of(pageno, pagesize, Sort.by(sortby));
        return this.projectRepository.findAll(pageable);
    }

    /**
     *Метод для получения пагинированного списка
     *проектов содержащих в названии значение name.
     *@param pageno Номер страницы
     *@param pagesize Размер страницы
     *@param sortby Поле для сортировки
     *@param name Значения для поиска по имени
     *@return Возвращает пагинированный список проектов
     */
    @RequestMapping(value = { "/projectfindbyname/{pageno}/{pagesize}/{sortby}/{name}" },
        method = RequestMethod.GET)
    public Page<ProjectModel> getProjectsByName(final @PathVariable int pageno,
                                                final @PathVariable int pagesize,
                                                final @PathVariable String sortby,
                                                final @PathVariable String name) {
        final Pageable pageable = PageRequest.of(pageno, pagesize, Sort.by(sortby));
        return this.projectRepository.findByNameContainingIgnoreCase(name, pageable);
    }

    /**
     *Метод для получения пагинированного списка,
     *проектов в отношении с заданным пользователем.
     *@param pageno Номер страницы
     *@param pagesize Размер страницы
     *@param sortby Поле для сортировки
     *@param userid Id пользователя
     *@return Возвращает пагинированный список проектов
     */
    @RequestMapping(value = { "/projectfindbyuser/{pageno}/{pagesize}/{sortby}/{userid}" },
        method = RequestMethod.GET)
    public Page<ProjectModel> getProjectsByUsers(final @PathVariable int pageno,
                                                 final @PathVariable int pagesize,
                                                 final @PathVariable String sortby,
                                                 final @PathVariable Long userid) {
        final Pageable pageable = PageRequest.of(pageno, pagesize, Sort.by(sortby));
        return this.projectRepository.findByUsers(this.userRepository.findById(userid), pageable);
    }

    /**
    *Метод для получения проекта по id.
    *@param projectid Id проекта
    *@return Возвращает данные о проекте
    */
    @RequestMapping(value = { "/project/{projectid}" }, method = RequestMethod.GET)
    public Optional<ProjectModel> getProject(final @PathVariable Long projectid) {
        return this.projectRepository.findById(projectid);
    }

    /**
    *Метод для создания нового проекта.
    *@param project Данные нового проекта
    *@return Возвращает данные нового проекта
    */
    @RequestMapping(value = { "/projects" }, method = RequestMethod.POST)
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ProjectModel createProject(final @Valid @RequestBody ProjectModel project) {
        return this.projectRepository.save(project);
    }

    /**
    *Метод для изменения существующго проекта.
    *@param projectid Id изменяемого проекта
    *@param projectreq Данные дял изменения проекта
    *@return Возвращает данные изменённого проекта или
    *исключение о том, что проект не найден.
    */
    @RequestMapping(value = { "/projects/{projectid}" }, method = RequestMethod.PUT)
    @PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
    public ProjectModel updateProject(final @PathVariable Long projectid,
                                      final @Valid @RequestBody ProjectModel projectreq) {
        return this.projectRepository.findById(projectid).map(
            project -> {
                project.setName(projectreq.getName());
                project.setTarget(projectreq.getTarget());
                project.setDescription(projectreq.getDescription());
                project.setTimelimitmonths(projectreq.getTimelimitmonths());
                project.setCost(projectreq.getCost());
                project.setApproved(projectreq.isApproved());
                return this.projectRepository.save(project);
            }).orElseThrow(() -> new ResourceNotFoundException(GlobalVariables.RELATIONOTFOUND_ERROR + projectid)
            );
    }

    /**
    *Метод для удаления существующго проекта.
    *@param projectid Id удаляемого проекта
    *@return Если проект с id не найден Возвращает
    *исключение с сообщением о ненайденном проектеs
    */
    @RequestMapping(value = { "/projects/{projectid}" }, method = RequestMethod.DELETE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteProject(final @PathVariable Long projectid) {
        return this.projectRepository.findById(projectid).map(
            project -> {
                this.projectRepository.delete(project);
                return ResponseEntity.ok().build();
            }).orElseThrow(() -> new ResourceNotFoundException(GlobalVariables.RELATIONOTFOUND_ERROR + projectid)
            );
    }

    /**
     *Метод для получения пагинированного списка проектов, с полем approved равным заданному и
     *находящихся в отношении с заданным пользователем.
     *@param pageno Номер страницы
     *@param pagesize Размер страницы
     *@param sortby Поле для сортировки
     *@param userid Id пользователя
     *@param approved True для получения только одобренных
     *проектов, false для получения только проектов
     *на рассмотрении
     *@return Возвращает пагинированный список проектов
     */
    @RequestMapping(value = {
        "/projectfindbyuserandapproved/{pageno}/{pagesize}/{sortby}/{userid}/{approved}" },
        method = RequestMethod.GET)
    public Page<ProjectModel> getProjByUsersAppr(final @PathVariable int pageno,
                                                 final @PathVariable int pagesize,
                                                 final @PathVariable String sortby,
                                                 final @PathVariable Long userid,
                                                 final @PathVariable Boolean approved) {
        final Pageable pageable = PageRequest.of(pageno, pagesize, Sort.by(sortby));
        return this.projectRepository.findByUsersAndApproved(
            this.userRepository.findById(userid), approved, pageable
            );
    }

    /**
     *Метод для получения пагинированного списка проектов, находящихся в отношении с заданным
     *пользователем и содержащих в названии значение name.
     *@param pageno Номер страницы
     *@param pagesize Размер страницы
     *@param sortby Поле для сортировки
     *@param userid Id пользователя
     *@param name Значения для поиска по имени
     *@return Возвращает пагинированный список проектов
     */
    @RequestMapping(value = {
        "/projectfindbyuserandname/{pageno}/{pagesize}/{sortby}/{userid}/{name}" },
        method = RequestMethod.GET)
    public Page<ProjectModel> getProjByUsersName(final @PathVariable int pageno,
                                                 final @PathVariable int pagesize,
                                                 final @PathVariable String sortby,
                                                 final @PathVariable Long userid,
                                                 final @PathVariable String name) {
        final Pageable pageable = PageRequest.of(pageno, pagesize, Sort.by(sortby));
        return this.projectRepository.findByUsersAndNameContainingIgnoreCase(
            this.userRepository.findById(userid), name, pageable
            );
    }

    /**
     *Метод для получения пагинированного списка проектов, cодержащих в названии значение
     *name и полем approved равным заданному.
     *@param pageno Номер страницы
     *@param pagesize Размер страницы
     *@param sortby Поле для сортировки
     *@param name Значения для поиска по имени
     *@param approved True для получения только одобренных
     *проектов, false для получения только проектов на
     *рассмотрении
     *@return Возвращает пагинированный список проектов
     */
    @RequestMapping(value = { "/projectfindbyname/{pageno}/{pagesize}/{sortby}/{name}/{approved}" },
        method = RequestMethod.GET)
    public Page<ProjectModel> getProjectsByNameAndApproved(final @PathVariable int pageno,
                                                           final @PathVariable int pagesize,
                                                           final @PathVariable String sortby,
                                                           final @PathVariable String name,
                                                           final @PathVariable boolean approved) {
        final Pageable pageable = PageRequest.of(pageno, pagesize, Sort.by(sortby));
        return this.projectRepository.findByNameContainingIgnoreCaseAndApproved(name, approved, pageable);
    }

    /**
    *Метод для получения пагинированного списка проектов, c полем approved равным заданному.
    *@param pageno Номер страницы
    *@param pagesize Размер страницы
    *@param sortby Поле для сортировки
    *@param approved True для получения только одобренных проектов, false для получения только проектов на рассмотрении
    *@return Возвращает пагинированный список проектов
    */
    @RequestMapping(value = { "/projectfindbyapproved/{pageno}/{pagesize}/{sortby}/{approved}" },
        method = RequestMethod.GET)
    public Page<ProjectModel> getProjectsByApproved(final @PathVariable int pageno,
                                                    final @PathVariable int pagesize,
                                                    final @PathVariable String sortby,
                                                    final @PathVariable boolean approved) {
        final Pageable pageable = PageRequest.of(pageno, pagesize, Sort.by(sortby));
        return this.projectRepository.findByApproved(approved, pageable);
    }

    /**
    *Метод для получения всех отоношений пользователь-проект.
    *@param pageable Интерфейс для пагинации
    *@return Возвращает отношения
    */
    @RequestMapping(value = { "/users_projects" }, method = RequestMethod.GET)
    @PreAuthorize("hasRole('ADMIN')")
    public Page<UserProjectModel> getUsersProjects(final Pageable pageable) {
        return this.userProjectRepository.findAll(pageable);
    }

    /**
    *Метод для создания отоношения пользователь-проект.
    *@param userproject Id пользователя и id проекта
    *@return Возвращает созданное отношение
    */
    @RequestMapping(value = { "/users_projects" }, method = RequestMethod.POST)
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public UserProjectModel createUserProject(
        final @Valid @RequestBody UserProjectModel userproject) {
        return this.userProjectRepository.save(userproject);
    }

    /**
    *Метод для изменения отоношения пользователь-проект.
    *@param userprojectid Id изменяемого отношения
    *@param userProjectRequest Id пользователя и id проекта для изменения
    *@return Возвращает изменённое отношение или исключение о том, что отношение не найдено
    */
    @RequestMapping(value = { "/users_projects/{userprojectid}/" }, method = RequestMethod.PUT)
    @PreAuthorize("hasRole('ADMIN')")
    public UserProjectModel updateUserProject(final @PathVariable Long userprojectid,
                                              final @Valid @RequestBody UserProjectModel userProjectRequest) {
        return this.userProjectRepository.findById(userprojectid).map(
            userproject -> {
                userproject.setProjectid(userProjectRequest.getProjectid());
                userproject.setUserid(userProjectRequest.getUserid());
                return this.userProjectRepository.save(userproject);
            }).orElseThrow(() -> new ResourceNotFoundException(
            GlobalVariables.RELATIONOTFOUND_ERROR + userprojectid
            ));
    }

    /**
    *Метод для удаления отоношения пользователь-проект.
    *@param userprojectid Id удаляемого отношения
    *@return Возвращает исключение о том, что отношение не найдено если отношение с данным id не существует
    */
    @RequestMapping(value = { "/users_projects/{userprojectid}" }, method = RequestMethod.DELETE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUserProject(final @PathVariable Long userprojectid) {
        return this.userProjectRepository.findById(userprojectid).map(
            userproject -> {
                this.userProjectRepository.delete(userproject);
                return ResponseEntity.ok().build();
            }).orElseThrow(
                () -> new ResourceNotFoundException(GlobalVariables.RELATIONOTFOUND_ERROR + userprojectid)
            );
    }
}
