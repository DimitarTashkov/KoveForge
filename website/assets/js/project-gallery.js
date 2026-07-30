const shot = (src, title, description, kind = "Екран от проекта") => ({
  src,
  title,
  description,
  kind,
});

const projectGalleries = {
  "bulgarian-talk-norms": {
    title: "Bulgarian Talk Norms",
    sector: "Образователен уебсайт",
    images: [
      shot("bulgarian-talk-norms-homepage.webp", "Начална страница", "Въведение в платформата и основните теми за езикови норми и дискусии.", "Уебсайт"),
      shot("bulgarian-talk-norms-about-platform.webp", "За платформата", "Представяне на аудиторията, учебните материали и ресурсите за самообучение."),
      shot("bulgarian-talk-norms-discussion-strategies.webp", "Стратегии за дискусия", "Практически насоки за ясен език, аргументация, формални изрази и противоположни гледни точки.", "Теория"),
      shot("bulgarian-talk-norms-literary-language-examples.webp", "Примери за книжовен език", "Интерактивен пример, който сравнява разговорна и книжовна формулировка.", "Теория"),
      shot("bulgarian-talk-norms-difficulty-selection.webp", "Избор на трудност", "Начален екран за избор между лесно, средно и трудно ниво.", "Упражнения"),
      shot("bulgarian-talk-norms-exercise-start.webp", "Начало на упражнение", "Въвеждане на име и стартиране на обобщителен тест по книжовни норми.", "Упражнения"),
      shot("bulgarian-talk-norms-interactive-test.webp", "Интерактивен тест", "Въпроси с избор на отговор за упражняване на правопис и граматика.", "Упражнения"),
      shot("bulgarian-talk-norms-results-explanations.webp", "Резултат и обяснения", "Финален резултат с пояснения към отговорите.", "Резултати"),
    ],
  },
  "chat-app": {
    title: "Chat App",
    sector: "Комуникация в реално време",
    images: [
      shot("18-screenshot-chat-1773095426958.webp", "Разговор в реално време", "Основният чат изглед с активна стая и поток от съобщения.", "Основен поток"),
      shot("20-screenshot-dashboard-1773095407704.webp", "Табло със стаи", "Работното табло за преглед и избор на чат стаи."),
      shot("19-screenshot-create-room-1773095507134.webp", "Създаване на стая", "Диалогът за създаване на ново пространство за разговор.", "Действие"),
      shot("21-screenshot-friends-1773095459526.webp", "Приятели и контакти", "Списъкът с контакти и достъпът до директни разговори."),
      shot("24-screenshot-settings-1773095479960.webp", "Настройки", "Потребителски настройки и персонализиране на профила."),
      shot("22-screenshot-login-1773095333523.webp", "Вход", "Защитен вход към приложението.", "Автентикация"),
      shot("14-register-form-initial-1773092497627.webp", "Регистрация", "Създаване на нов потребителски профил.", "Автентикация"),
    ],
  },
  "dental-booking": {
    title: "DentalBooking",
    sector: "Дентална клиника / резервации",
    images: [
      shot("06-dental-booking-screen.webp", "Начална страница", "Ясно представяне на клиниката и директен път към записване на час.", "Уебсайт"),
      shot("03-dental-booking-screen.webp", "Екип от специалисти", "Търсене и избор на зъболекар според специалността."),
      shot("04-dental-booking-screen.webp", "Каталог с услуги", "Услуги, цени, продължителност и директно записване."),
      shot("02-dental-booking-screen.webp", "Календар за записване", "Филтриране по специалист и услуга с календар за свободни часове.", "Резервации"),
      shot("08-dental-booking-screen.webp", "Избран ден и специалист", "Конкретен избор на дата и зареждане на наличните часове.", "Резервации"),
      shot("01-dental-booking-screen.webp", "Вход в системата", "Достъп до пациентския профил и предстоящите резервации.", "Автентикация"),
    ],
  },
  dentora: {
    title: "Dentora",
    sector: "Клиника / резервации",
    images: [
      shot("12-home-doctor-form.webp", "Табло за лекар", "Централен преглед на леченията и бързите действия.", "Основно табло"),
      shot("13-home-patient-form.webp", "Пациентско начало", "Начален изглед с най-важната информация за пациента."),
      shot("03-book-appointment-form.webp", "Записване на час", "Работен поток за избор и потвърждаване на посещение.", "Резервации"),
      shot("21-schedules-form.webp", "Графици", "Организиране на работното време и наличните часове."),
      shot("16-patient-appointments.webp", "Часове на пациента", "Преглед на предстоящи и минали посещения."),
      shot("18-patients-form.webp", "Пациенти", "Управление и бързо откриване на пациентски профили."),
      shot("22-treatments-form.webp", "Лечения", "Управление на лечебните дейности и свързаните данни."),
      shot("14-inventory-form.webp", "Наличности", "Проследяване на материали и консумативи."),
      shot("06-daily-report.webp", "Дневен отчет", "Обобщение на дневната работа и ключовите показатели.", "Отчети"),
      shot("07-db-diagram.png", "Архитектура на данните", "Диаграма на основните обекти и връзки в системата.", "Архитектура"),
    ],
  },
  "car-rental": {
    title: "Car Rental",
    sector: "Автомобили / Рент-а-кар",
    images: [
      shot("main-page.webp", "Начална страница", "Основен изглед на портала за наемане на автомобили.", "Основно табло"),
      shot("car-gallery.webp", "Автопарк", "Преглед на наличните автомобили.", "Каталог"),
      shot("sign-up.webp", "Регистрация", "Потребителска регистрация.", "Автентикация"),
      shot("rate-us.webp", "Оценка", "Обратна връзка от клиенти.", "Отзиви"),
      shot("contact-us.webp", "Контакти", "Информация за връзка с нас.", "Информация"),
    ],
  },
  "fitness-center": {
    title: "Fitness Center",
    sector: "Фитнес / здраве",
    images: [
      shot("02-fitness-center-screen.webp", "Начално табло", "Главната навигация към профил, програми и хранителни режими.", "Основно табло"),
      shot("03-fitness-center-screen.webp", "Фитнес програми", "Създаване на тренировъчна програма според избрани мускулни групи."),
      shot("04-fitness-center-screen.webp", "Хранителен план", "Персонализиране на хранителен режим според целите на потребителя."),
      shot("05-fitness-center-screen.webp", "Потребителски профил", "Преглед на профилната информация и ролята в системата."),
      shot("06-fitness-center-screen.webp", "Администраторско табло", "Бърз достъп до административните функции."),
      shot("07-fitness-center-screen.webp", "Управление на потребители", "Добавяне, редактиране и премахване на профили.", "Администрация"),
    ],
  },
  gocetransportapp: {
    title: "GoceTransportApp",
    sector: "Транспортна платформа",
    images: [
      shot("01-screenshot-2026-04-16-101330.webp", "Търсене на пътуване", "Началната страница събира маршрут, дата и основни действия в един екран.", "Основен поток"),
      shot("transport-schedules-overview.webp", "Разписания", "Преглед и филтриране на наличните транспортни връзки."),
      shot("transport-route-details.webp", "Детайли за маршрут", "Подробна информация за избраното пътуване."),
      shot("transport-ticket-booking.webp", "Резервация на билет", "Потокът за избор и потвърждаване на билет.", "Резервации"),
      shot("transport-user-dashboard.webp", "Потребителско табло", "Централен преглед на действията и пътуванията."),
      shot("transport-management-view.webp", "Управление на транспорт", "Оперативен изглед за транспортни данни.", "Администрация"),
      shot("transport-admin-panel.webp", "Административен панел", "Разширени инструменти за управление на платформата.", "Администрация"),
    ],
  },
  "hotel-oazis": {
    title: "Hotel Oazis",
    sector: "Хотелски мениджмънт",
    images: [
      shot("19-image7.webp", "Начална страница", "Вход към стаите, услугите и основните хотелски потоци.", "Основно табло"),
      shot("20-image8.webp", "Каталог със стаи", "Свободни стаи, цени и действия за резервация."),
      shot("01-image10.webp", "Детайли за стая", "Информация за тип, цена, наличност и описание."),
      shot("07-image16.webp", "Нова резервация", "Избор на период за настаняване и напускане.", "Резервации"),
      shot("14-image22.webp", "Потребителски профил", "Редактиране на лични данни и управление на акаунта."),
      shot("10-image19.webp", "Управление на потребители", "Административен преглед на потребителските роли.", "Администрация"),
      shot("21-image9.webp", "Редактиране на стая", "Промяна на цена, тип, снимка и наличност.", "Администрация"),
      shot("12-image20.webp", "Контакти", "Контактни данни и работно време на хотела.", "Информация"),
    ],
  },
  "medica-pulse": {
    title: "Medica Pulse",
    sector: "Здравеопазване / Медицина",
    images: [
      shot("home-page.webp", "Начална страница", "Централно табло на болничната система.", "Основно табло"),
      shot("cardiology.webp", "Отделение Кардиология", "Преглед на медицинските услуги и специалисти.", "Отделение"),
      shot("patient-profiles.webp", "Пациентски профили", "Управление на медицинска информация.", "Профили"),
      shot("information-page-for-the-client.webp", "Информация за пациента", "Полезна информация за клиентите.", "Информация"),
      shot("registration.webp", "Регистрация", "Създаване на нов пациентски профил.", "Автентикация"),
      shot("contact-us.webp", "Контакти", "Връзка с администрацията.", "Информация"),
    ],
  },
  "prizma-studio": {
    title: "Prisma Studio",
    sector: "Фото студио / магазин",
    images: [
      shot("12-home-form.webp", "Начална страница", "Директен достъп до фотографските услуги и магазина.", "Основно табло"),
      shot("20-shop-form.webp", "Онлайн магазин", "Каталог с продукти и действия за покупка."),
      shot("06-book-session-form.webp", "Запазване на сесия", "Резервация на фотографска услуга.", "Резервации"),
      shot("09-cart-from.webp", "Количка", "Преглед на избраните продукти преди поръчка."),
      shot("07-cart-form-invoice.webp", "Фактура", "Финализиране на поръчка и издаване на документ.", "Поръчки"),
      shot("15-profie-form.webp", "Профил", "Управление на личните данни и предпочитанията."),
      shot("14-manageproducts-form.webp", "Управление на продукти", "Административни действия върху продуктовия каталог.", "Администрация"),
      shot("21-users-form.webp", "Потребители", "Управление на достъпа и профилите.", "Администрация"),
      shot("11-db-diagram.webp", "Архитектура на данните", "Основните обекти и връзки в приложението.", "Архитектура"),
    ],
  },
  "restaurant-salaries": {
    title: "RestaurantSalaries",
    sector: "Ресторантьорство / управление",
    images: [
      shot("01-restaurant-salaries-screen.webp", "Начално табло", "Обобщение на възможностите за служители, заплати и отчети.", "Основно табло"),
      shot("02-restaurant-salaries-screen.webp", "Служители", "Регистър и управление на служителите."),
      shot("03-restaurant-salaries-screen.webp", "Изчисляване на заплати", "Работен поток за автоматизирано изчисление."),
      shot("04-restaurant-salaries-screen.webp", "Справки и отчети", "Обобщени данни за възнагражденията.", "Отчети"),
    ],
  },
  resurs11: {
    title: "Resurs 11",
    sector: "Бизнес уебсайт / търсачки",
    images: [
      shot("01-homepage-hero.webp", "Начална страница", "Силен първи екран с фокус върху отоплението, доставката и бързия контакт.", "Начална страница"),
      shot("02-homepage-products.webp", "Основни продуктови категории", "Пелети, екобрикети и въглища са представени с ясни преки действия.", "Начална страница"),
      shot("03-homepage-delivery-intro.webp", "Преход към логистиката", "Плавно продължение от продуктовия каталог към услугата за доставка.", "Начална страница"),
      shot("04-homepage-fleet.webp", "Транспортни възможности", "Камион с кран, самосвал и палетна количка в лесен за сравнение изглед.", "Начална страница"),
      shot("05-homepage-contact-highlights.webp", "Бърза контактна информация", "Адрес, телефони и обещание за бърза доставка са достъпни още на началната страница.", "Начална страница"),
      shot("06-homepage-advantages.webp", "Предимства на Resurs 11", "Собствена база, транспорт, проверени марки и лично обслужване.", "Начална страница"),
      shot("07-homepage-testimonials.webp", "Клиентски отзиви", "Социално доказателство чрез кратки и четими клиентски мнения.", "Начална страница"),
      shot("08-homepage-call-to-action.webp", "Финален призив за поръчка", "Контекстни действия за телефонно обаждане или изпращане на запитване.", "Начална страница"),
      shot("09-product-catalog-overview.webp", "Каталог с продукти", "Категории, наличности и продуктов избор в един общ преглед.", "Каталог"),
      shot("10-pellet-catalog.webp", "Категория пелети", "Филтриран каталог с марки, цени и кратки продуктови описания.", "Каталог"),
      shot("11-product-details.webp", "Детайли за продукт", "Технически характеристики и голямо продуктово изображение за информиран избор.", "Продукт"),
      shot("12-product-pricing-description.webp", "Цени и описание", "Цени за тон и чувал, действия за поръчка и подробно описание.", "Продукт"),
      shot("13-delivery-page-hero.webp", "Доставка със собствен транспорт", "Самостоятелна страница, която въвежда автопарка и логистичната услуга.", "Доставка"),
      shot("14-crane-truck-delivery.webp", "Камион с кран", "Предимствата на разтоварването с кран са подкрепени с реална снимка.", "Доставка"),
      shot("15-dump-truck-delivery.webp", "Камион самосвал", "Визуално представяне на транспорта за насипни товари и големи количества.", "Доставка"),
      shot("16-delivery-process.webp", "Процес на доставка", "Четири ясни стъпки от първото обаждане до разтоварването на адрес.", "Доставка"),
      shot("17-delivery-area-map.webp", "Зона на доставка", "Работно време, складова база и интерактивна карта за лесна ориентация.", "Доставка"),
      shot("18-about-page.webp", "За Resurs 11", "Представяне на компанията с акцент върху качеството и доверието.", "За компанията"),
      shot("19-about-benefits.webp", "Защо да изберете Resurs 11", "Ключовите бизнес предимства са подредени в спокойни информационни карти.", "За компанията"),
      shot("20-warehouse-logistics.webp", "Склад и логистика", "Реални снимки показват складовата база, наличностите и подготовката за доставка.", "За компанията"),
      shot("21-contact-page.webp", "Контакти и карта", "Телефони, имейл, адрес и карта са събрани в удобен контактен изглед.", "Контакти"),
      shot("22-gallery-page.webp", "Галерия на доставчика", "Филтрирана визуална галерия със складови и транспортни снимки.", "Галерия"),
      shot("23-about-page-overview.webp", "Цялостен фирмен изглед", "Широк преглед на фирмената страница и последователната визуална система.", "За компанията"),
    ],
  },
  retrorides: {
    title: "RetroRides",
    sector: "Музей / резервации",
    images: [
      shot("16-home-form.webp", "Начална страница", "Вход към автомобилната колекция и магазина.", "Основно табло"),
      shot("11-catalog-form.webp", "Каталог с автомобили", "Преглед на колекцията и детайлите за експонатите."),
      shot("10-book-visit-form.webp", "Резервация за посещение", "Избор и потвърждаване на посещение.", "Резервации"),
      shot("32-store-form.webp", "Магазин за сувенири", "Каталог с продукти, свързани с музея."),
      shot("12-checkout-form.webp", "Завършване на поръчка", "Потвърждение на данните и покупката.", "Поръчки"),
      shot("25-profile-form.webp", "Потребителски профил", "Лични данни, резервации и поръчки."),
      shot("20-manage-store-form.webp", "Управление на магазина", "Административен контрол върху сувенирите.", "Администрация"),
      shot("21-manage-vehicles-form.webp", "Управление на автомобилите", "Добавяне и редактиране на експонати.", "Администрация"),
      shot("23-orders-form-orders.webp", "Управление на поръчки", "Проследяване на клиентските поръчки.", "Администрация"),
      shot("14-db-diagram.png", "Архитектура на данните", "Диаграма на ключовите обекти в системата.", "Архитектура"),
    ],
  },
  "shooter-game": {
    title: "Shooter Game",
    sector: "Интерактивно приложение",
    images: [
      shot("04-menu.webp", "Главно меню", "Начална точка за избор и стартиране на игра.", "Навигация"),
      shot("06-setup.webp", "Настройване на игра", "Избор на параметри преди началото."),
      shot("01-game-map.webp", "Игрова карта", "Основният тактически екран с карта, статус и действия.", "Игрови процес"),
      shot("03-leaderboard.webp", "Класация", "Резултати и сравнение между играчите."),
      shot("05-orc-mini-game.webp", "Орк мини игра", "Специално интерактивно предизвикателство.", "Мини игра"),
      shot("09-tank-mini-game.webp", "Танк мини игра", "Допълнителен игрови режим.", "Мини игра"),
      shot("11-warrior-mini-game.webp", "Воин мини игра", "Бързо предизвикателство с различна механика.", "Мини игра"),
      shot("12-wizard-mini-game.webp", "Магьосник мини игра", "Алтернативна мини игра с тематични правила.", "Мини игра"),
      shot("07-shotgun-jam-effect.webp", "Ефект на оръжие", "Пример за динамична логика и състояние на оръжието."),
      shot("10-uml-diagram.webp", "Архитектура на играта", "UML преглед на основните класове и връзки.", "Архитектура"),
    ],
  },
  stagenova: {
    title: "StageNova",
    sector: "Театър / билети",
    images: [
      shot("08-index-form.webp", "Начална страница", "Директен вход към репертоара и театралния магазин.", "Основно табло"),
      shot("14-plays-form.webp", "Репертоар", "Каталог с постановки и ключова информация."),
      shot("04-bookvisit-form.webp", "Резервация на билет", "Избор и запазване на посещение.", "Резервации"),
      shot("17-shop-form.webp", "Магазин", "Театрални продукти и действия за покупка."),
      shot("12-my-bookins-tickets-form.webp", "Моите билети", "История и статус на резервираните билети."),
      shot("13-my-bookins-merch-form.webp", "Моите поръчки", "Преглед на покупките от магазина."),
      shot("15-profile-form.webp", "Профил", "Управление на личните данни."),
      shot("10-manage-merch-form.webp", "Управление на продукти", "Административен контрол върху магазина.", "Администрация"),
      shot("11-manage-plays-form.webp", "Управление на постановки", "Добавяне и редактиране на репертоара.", "Администрация"),
      shot("06-db-diagram.png", "Архитектура на данните", "Основните обекти и връзки в платформата.", "Архитектура"),
    ],
  },
  "toy-shop": {
    title: "ToyShop",
    sector: "Магазин / търговия",
    images: [
      shot("01-toy-shop-screen.webp", "Продуктов каталог", "Търсене, продукти и бързи административни действия.", "Основно табло"),
      shot("02-toy-shop-screen.webp", "Количка и поръчка", "Работният поток за покупка на избрани продукти."),
      shot("03-toy-shop-screen.webp", "Управление на магазина", "Административен изглед за продукти и потребители.", "Администрация"),
    ],
  },
  zoozen: {
    title: "ZooZen",
    sector: "Зоомагазин / онлайн магазин",
    images: [
      shot("09-login-form.webp", "Вход в ZooZen", "Представяне на основните възможности и защитен достъп.", "Основен екран"),
      shot("03-catalog-form.webp", "Продуктов каталог", "Категории, търсене, наличности и добавяне в количка."),
      shot("04-checkout-form.webp", "Завършване на поръчка", "Данни за доставка, промо код и крайна сума.", "Поръчки"),
      shot("14-promotions-form.webp", "Промоции", "Филтриран каталог с активни предложения."),
      shot("13-profile-form.webp", "Потребителски профил", "Лични данни и управление на акаунта."),
      shot("11-orders-form.png", "Поръчки", "История и управление на направените поръчки."),
      shot("12-product-management-form.png", "Управление на продукти", "Административен контрол на каталога.", "Администрация"),
      shot("18-users-form.png", "Управление на потребители", "Потребителски роли и достъп.", "Администрация"),
      shot("06-db-diagram.webp", "Архитектура на данните", "Диаграма на основните обекти в магазина.", "Архитектура"),
    ],
  },
};

const galleries = document.querySelectorAll("[data-project-gallery]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

galleries.forEach((gallery) => {
  const slug = gallery.dataset.currentProject;
  const project = projectGalleries[slug];

  if (!project?.images.length) {
    gallery.hidden = true;
    return;
  }

  // Root-relative on purpose. This path also lands in a custom property
  // (--gallery-backdrop) that visual-refresh.css consumes via var(), and browsers
  // resolve url() inside a substituted custom property against the *consuming*
  // stylesheet - /assets/css/ - not this document. A "../assets/..." value
  // therefore became "/assets/assets/..." and 404'd on every project page.
  const assetRoot = gallery.dataset.assetRoot || `/assets/images/projects/${slug}/`;
  let activeIndex = 0;
  let isPlaying = false;
  let isVisible = false;
  let intervalId;
  let pointerStart;
  let returnFocus;
  let suppressExpand = false;

  gallery.innerHTML = `
    <div class="case-gallery-heading">
      <div>
        <p class="eyebrow">ГАЛЕРИЯ НА ПРОЕКТА</p>
        <h2>Галерия на ${project.title}</h2>
        <p>Подбрани реални екрани, подредени от основното изживяване към работните потоци и администрацията.</p>
      </div>
      <div class="gallery-controls" role="group" aria-label="Контроли за галерията">
        <button class="gallery-control" type="button" aria-label="Предишен екран" data-gallery-prev>←</button>
        <button class="gallery-control gallery-play" type="button" aria-label="Стартирай слайдшоуто" aria-pressed="false" data-gallery-toggle>Старт</button>
        <button class="gallery-control" type="button" aria-label="Следващ екран" data-gallery-next>→</button>
        <button class="gallery-control" type="button" aria-label="Отвори на цял екран" data-gallery-expand>↗</button>
      </div>
    </div>
    <div class="gallery-shell">
      <div class="gallery-stage">
        <button class="gallery-main-link" type="button" aria-label="Отвори активния екран в голям размер" data-gallery-main>
          <img alt="" decoding="async" data-gallery-image>
        </button>
        <div class="gallery-caption" aria-live="polite">
          <div class="gallery-caption-copy">
            <span data-gallery-kind></span>
            <strong data-gallery-title></strong>
            <p class="gallery-caption-description" data-gallery-description></p>
          </div>
          <p data-gallery-counter></p>
        </div>
      </div>
      <div class="gallery-thumbs" role="list" aria-label="Екрани от ${project.title}" data-gallery-thumbs></div>
    </div>
    <dialog class="gallery-dialog" aria-label="Голям преглед на галерията" data-gallery-dialog>
      <div class="gallery-dialog-inner">
        <div class="gallery-dialog-bar">
          <strong>${project.title}</strong>
          <button class="gallery-dialog-button" type="button" aria-label="Затвори големия преглед" data-dialog-close>✕</button>
        </div>
        <div class="gallery-dialog-stage">
          <button class="gallery-dialog-button" type="button" aria-label="Предишен екран" data-dialog-prev>←</button>
          <img class="gallery-dialog-image" alt="" decoding="async" data-dialog-image>
          <button class="gallery-dialog-button" type="button" aria-label="Следващ екран" data-dialog-next>→</button>
        </div>
        <div class="gallery-dialog-caption">
          <strong data-dialog-title></strong>
          <span data-dialog-counter></span>
        </div>
      </div>
    </dialog>
  `;

  const image = gallery.querySelector("[data-gallery-image]");
  const mainButton = gallery.querySelector("[data-gallery-main]");
  const title = gallery.querySelector("[data-gallery-title]");
  const description = gallery.querySelector("[data-gallery-description]");
  const kind = gallery.querySelector("[data-gallery-kind]");
  const counter = gallery.querySelector("[data-gallery-counter]");
  const thumbs = gallery.querySelector("[data-gallery-thumbs]");
  const previousButton = gallery.querySelector("[data-gallery-prev]");
  const nextButton = gallery.querySelector("[data-gallery-next]");
  const toggleButton = gallery.querySelector("[data-gallery-toggle]");
  const expandButton = gallery.querySelector("[data-gallery-expand]");
  const dialog = gallery.querySelector("[data-gallery-dialog]");
  const dialogImage = gallery.querySelector("[data-dialog-image]");
  const dialogTitle = gallery.querySelector("[data-dialog-title]");
  const dialogCounter = gallery.querySelector("[data-dialog-counter]");

  const sourceFor = (item) => `${assetRoot}${item.src}`;

  const preloadAdjacent = () => {
    if (project.images.length < 2) return;
    [-1, 1].forEach((offset) => {
      const item = project.images[(activeIndex + offset + project.images.length) % project.images.length];
      const preload = new Image();
      preload.src = sourceFor(item);
    });
  };

  const renderThumbs = () => {
    thumbs.innerHTML = project.images.map((item, index) => `
      <button class="gallery-thumb" type="button" role="listitem" data-gallery-thumb="${index}" aria-label="Покажи: ${item.title}">
        <img alt="" loading="lazy" decoding="async" data-src="${sourceFor(item)}">
        <span class="gallery-thumb-copy">
          <span>${item.title}</span>
          <small>${item.kind}</small>
        </span>
      </button>
    `).join("");

    const lazyImages = thumbs.querySelectorAll("img[data-src]");
    if (!("IntersectionObserver" in window)) {
      lazyImages.forEach((thumbImage) => {
        thumbImage.src = thumbImage.dataset.src;
        delete thumbImage.dataset.src;
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.src = entry.target.dataset.src;
        delete entry.target.dataset.src;
        observer.unobserve(entry.target);
      });
    }, { root: thumbs, rootMargin: "240px" });

    lazyImages.forEach((thumbImage) => observer.observe(thumbImage));
  };

  const updateGallery = (nextIndex, { moveThumb = true } = {}) => {
    activeIndex = (nextIndex + project.images.length) % project.images.length;
    const item = project.images[activeIndex];
    const source = sourceFor(item);

    image.src = source;
    image.alt = `${project.title}: ${item.title}`;
    mainButton.style.setProperty("--gallery-backdrop", `url("${source.replaceAll('"', "%22")}")`);
    title.textContent = item.title;
    description.textContent = item.description;
    kind.textContent = `${project.sector} · ${item.kind}`;
    counter.textContent = `${activeIndex + 1} / ${project.images.length}`;
    dialogImage.src = source;
    dialogImage.alt = `${project.title}: ${item.title}`;
    dialogTitle.textContent = item.title;
    dialogCounter.textContent = `${activeIndex + 1} / ${project.images.length}`;

    gallery.querySelectorAll("[data-gallery-thumb]").forEach((thumb, index) => {
      const isActive = index === activeIndex;
      thumb.classList.toggle("is-active", isActive);
      thumb.setAttribute("aria-current", isActive ? "true" : "false");
      if (isActive && moveThumb) thumb.scrollIntoView({ block: "nearest", inline: "nearest" });
    });

    preloadAdjacent();
  };

  const stopTimer = () => {
    window.clearInterval(intervalId);
    intervalId = undefined;
  };

  const syncTimer = () => {
    stopTimer();
    if (!isPlaying || !isVisible || dialog.open || document.hidden || reducedMotion.matches || project.images.length < 2) return;
    intervalId = window.setInterval(() => updateGallery(activeIndex + 1), 5600);
  };

  const setPlaying = (playing) => {
    isPlaying = playing && !reducedMotion.matches && project.images.length > 1;
    toggleButton.textContent = isPlaying ? "Пауза" : "Старт";
    toggleButton.setAttribute("aria-pressed", String(isPlaying));
    toggleButton.setAttribute("aria-label", isPlaying ? "Пауза на слайдшоуто" : "Стартирай слайдшоуто");
    syncTimer();
  };

  const openDialog = (trigger) => {
    if (typeof dialog.showModal !== "function") return;
    returnFocus = trigger;
    stopTimer();
    dialog.showModal();
    gallery.querySelector("[data-dialog-close]").focus();
  };

  const closeDialog = () => {
    dialog.close();
  };

  const step = (offset) => {
    updateGallery(activeIndex + offset);
    syncTimer();
  };

  previousButton.addEventListener("click", () => step(-1));
  nextButton.addEventListener("click", () => step(1));
  toggleButton.addEventListener("click", () => setPlaying(!isPlaying));
  expandButton.addEventListener("click", () => openDialog(expandButton));
  mainButton.addEventListener("click", () => {
    if (!suppressExpand) openDialog(mainButton);
  });
  gallery.querySelector("[data-dialog-prev]").addEventListener("click", () => step(-1));
  gallery.querySelector("[data-dialog-next]").addEventListener("click", () => step(1));
  gallery.querySelector("[data-dialog-close]").addEventListener("click", closeDialog);

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog();
  });

  dialog.addEventListener("close", () => {
    returnFocus?.focus();
    syncTimer();
  });

  thumbs.addEventListener("click", (event) => {
    const thumb = event.target.closest("[data-gallery-thumb]");
    if (thumb) {
      updateGallery(Number(thumb.dataset.galleryThumb));
      syncTimer();
    }
  });

  mainButton.addEventListener("pointerdown", (event) => {
    pointerStart = { x: event.clientX, y: event.clientY };
  });

  mainButton.addEventListener("pointerup", (event) => {
    if (!pointerStart) return;
    const deltaX = event.clientX - pointerStart.x;
    const deltaY = event.clientY - pointerStart.y;
    pointerStart = undefined;

    if (Math.abs(deltaX) > 44 && Math.abs(deltaX) > Math.abs(deltaY)) {
      event.preventDefault();
      suppressExpand = true;
      step(deltaX < 0 ? 1 : -1);
      window.setTimeout(() => { suppressExpand = false; }, 0);
    }
  });

  mainButton.addEventListener("pointercancel", () => {
    pointerStart = undefined;
  });

  gallery.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      step(event.key === "ArrowRight" ? 1 : -1);
    }
  });

  gallery.addEventListener("mouseenter", stopTimer);
  gallery.addEventListener("mouseleave", syncTimer);
  gallery.addEventListener("focusin", stopTimer);
  gallery.addEventListener("focusout", (event) => {
    if (!gallery.contains(event.relatedTarget)) syncTimer();
  });

  document.addEventListener("visibilitychange", syncTimer);
  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) setPlaying(false);
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      syncTimer();
    }, { rootMargin: "300px 0px" }).observe(gallery);
  } else {
    isVisible = true;
  }

  if (project.images.length < 2) {
    previousButton.disabled = true;
    nextButton.disabled = true;
    toggleButton.disabled = true;
    gallery.querySelector("[data-dialog-prev]").disabled = true;
    gallery.querySelector("[data-dialog-next]").disabled = true;
  }

  renderThumbs();
  updateGallery(0, { moveThumb: false });
});
