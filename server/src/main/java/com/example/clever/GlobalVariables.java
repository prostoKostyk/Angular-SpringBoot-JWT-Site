/*
 */
package com.example.clever;

/**
*Kласс cо строками.
* @since 1.0
*/
public class GlobalVariables {
    /**
    *Переменная с ошибкой "Пользователь не найден".
    */
    public static final String USERNOTFOUND_ERROR =
        "Пользователь не найден с id: ";

    /**
    *Переменная с ошибкой "Компания не найдена".
    */
    public static final String COMPANYNOTFOUND_ERROR =
        "Не найдена компания с id: ";

    /**
    *Переменная с ошибкой "Отношенени не найдено".
    */
    public static final String RELATIONOTFOUND_ERROR =
        "Не найдено отношение с id: ";

    /**
    *Переменная с ошибкой "Роль не сущестует".
    */
    public static final String ROLENOTFOUND_ERROR = "Error: Роль не существует.";

    /**
    *Переменная с ошибкой "Логин уже занят".
    */
    public static final String LOGINTAKEN_ERROR = "Логин уже занят";

    /**
    *Переменная с ошибкой "Email уже занят".
    */
    public static final String EMAILTAKEN_ERROR =
        "Пользователь с этим email уже зарегистрирован";

    /**
    *Переменная с ошибкой "Не авторизирован".
    */
    public static final String UNAUTH_ERROR =
        "Пользователь не авторизирован";

    /**
    *Переменная с сообщением "Регистрация успешна".
    */
    public static final String REGISTRSUCCESS_MESSAGE = "Регистрация успешна";

    /**
    *Переменная с темой письма,
    *отправляемого для восстановления пароля.
    */
    public static final String VALUE_OF_MAILSUBJECT =
        "Clever, восстановление пароля";

    /**
    *Переменная с адресом, с которого отправляется
    *письмо для восстановления пароля.
    */
    public static final String VALUE_OF_MAILFROM = "osockin.kos@yandex.ru";

    /**
    *Переменная с текстом для восстановления пароля.
    */
    public static final String VALUE_OF_MAILTEXT =
        "Перейдите по ссылке чтобы изменить пароль: ";

    /**
    *Переменная с ссылкой на восстановление пароля.
    */
    public static final String VALUE_OF_MAILURL = "http://localhost:4200/#/confirm-reset?token=";

    /**
    *Переменная maxage для CrossOrigin.
    */
    public static final int MAXAGE = 3600;

    /**
    *Число, с которого начинается генерация id.
    */
    public static final int VALUE_OF_ID_INITIALVALUE = 1000;

    /**
    *ALLOCATIONSIZE.
    */
    public static final int ALLOCATSIZE = 100;

    /**
    *Длинна VALUE_OF_BEARLEN_SIZE в токене.
    */
    public final static int VALUE_OF_BEARLEN_SIZE = 7;

}
