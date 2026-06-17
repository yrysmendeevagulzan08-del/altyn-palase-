import { LuxuryRoom, LuxuryService, CustomizationOption, GuestReview, MultilingualText } from './types';

import heroImg from './assets/images/hotel_hero_1781120948860.png';
import founderImg from './assets/images/founder_guljan_1781122276504.png';
import poolImg from './assets/images/luxury_thermal_pool_1781123653263.png';
import spaImg from './assets/images/golden_spa_salon_1781123675265.png';
import presidentialImg from './assets/images/presidential_suite_1781120865782.png';
import penthouseImg from './assets/images/royal_penthouse_1781120886897.png';
import villaImg from './assets/images/garden_villa_1781120908780.png';
import oceanImg from './assets/images/ocean_suite_1781120927458.png';

// Exporting the exact generated image URLs
export const HERO_IMAGE = heroImg;
export const FOUNDER_IMAGE = founderImg;
export const POOL_IMAGE = poolImg;
export const SPA_IMAGE = spaImg;

export const LUXURY_ROOMS: LuxuryRoom[] = [
  {
    id: "presidential-suite",
    name: {
      KG: "Президенттик Падышалык Люкс",
      EN: "Presidential Royal Suite",
      RU: "Президентский Королевский Люкс"
    },
    tagline: {
      KG: "Асман тиреген панорамалык кымбатчылык",
      EN: "Majestic skyline luxury beyond expectations",
      RU: "Великолепная панорама роскоши на высоте"
    },
    description: {
      KG: "Тоолордун жана шаардын эң сонун көрүнүшү менен заманбап дизайндын биримдиги. Жеке террасасы жана жогорку деңгээлдеги коопсуздугу менен айырмаланат.",
      EN: "Ultimate architectural masterpiece blending mountain peaks and skyline. Featuring standard luxury inclusions, private secure entry, and a majestic dining hall.",
      RU: "Уникальный архитектурный шедевр, объединяющий виды на вершины гор и город. Роскошная гостиная, персональный вход и премиальная отделка интерьера."
    },
    longDescription: {
      KG: "Президенттик Падышалык Люкс биздин мейманкананын сыймыгы болуп саналат. Бул жерде заманбап дизайн, мрамор каминдери жана панорамалык айнек терезелер биригип, сизге унутулгус сезимдерди тартуулайт. Эң сонун эмеректер, италиялык жибек шейшептер жана эң акыркы акылдуу үй технологиялары орнотулган.",
      EN: "The Presidential Royal Suite is the crown jewel of Altyn Palace. Curated with priceless Italian marble fireplaces, elegant hand-painted silk wall coverings, and state-of-the-art smart home networks, it satisfies the refined tastes of global dignitaries and royals looking for absolute privacy.",
      RU: "Президентский Королевский люкс — главный венец Altyn Palace. Здесь сочетаются редкие сорта итальянского мрамора, шелковые обои ручной работы, панорамные окна во всю стену и новейшие технологии умного дома для незабываемого отдыха мирового уровня."
    },
    pricePerNight: 280,
    maxGuests: 4,
    sizeSqm: 240,
    viewType: {
      KG: "Ала-Тоо тоолоруна жана шаардык пейзажга караган панорама",
      EN: "Panoramic Ala-Too mountain range & glittering city skyline",
      RU: "Панорама на горы Ала-Тоо и сияющий город"
    },
    bedType: {
      KG: "2х Императордук Кинг-Сайз (Жибек шейшептер менен)",
      EN: "2x Imperial King-Size (with premium organic silk sheets)",
      RU: "2х Императорский King-Size (с шелковым бельем)"
    },
    image: presidentialImg,
    amenities: [
      { KG: "Жеке Фин Саунасы жана Жаккузи", EN: "Private Finnish Sauna & Whirlpool", RU: "Частная финская сауна и джакузи" },
      { KG: "Bang & Olufsen Премиум Стерео Системасы", EN: "Bang & Olufsen Premium Surround Sound", RU: "Аудиосистема Bang & Olufsen" },
      { KG: "Жеке жылууланган терраса", EN: "Heated private panoramic terrace", RU: "Индивидуальная терраса с подогревом" },
      { KG: "Баалуу ичимдиктердин премиум бары", EN: "Prestige organic bar containing rare reserves", RU: "Премиум-бар с изысканными напитками" },
      { KG: "Айнек камин жана китепкана", EN: "Double-sided glass hearth & library nook", RU: "Двусторонний стеклянный камин и библиотека" }
    ],
    specialPerk: {
      KG: "Кирүү күнү атайын Dom Pérignon шампаны белекке берилет",
      EN: "Chilled vintage Dom Pérignon waiting on arrival",
      RU: "Охлажденное шампанское Dom Pérignon при заезде"
    }
  },
  {
    id: "royal-penthouse",
    name: {
      KG: "Падышалык Асмандагы Пентхаус",
      EN: "Royal Celestial Penthouse",
      RU: "Королевский Небесный Пентхаус"
    },
    tagline: {
      KG: "Көк асман астындагы чексиз бейпилдик",
      EN: "Breathtaking sky-level serenity and private pool",
      RU: "Головокружительное величие над облаками"
    },
    description: {
      KG: "Эң бийик кабатта жайгашкан жеке бассейни жана ачык абадагы камини бар укмуштуудай мейкиндик. Элиталык эс алуу үчүн идеалдуу тандап алуу.",
      EN: "Perched on the highest floor with a sky-high private infinity pool, custom stone fireplace, and pristine luxury layouts tailored for elite guests.",
      RU: "Расположен на верхнем этаже: собственный инфинити-бассейн под открытем небом, дизайнерский камин и эксклюзивная лаунж-зона для ценителей уединения."
    },
    longDescription: {
      KG: "Падышалык Асмандагы Пентхаустун негизги өзгөчөлүгү – бул анын чексиз узун бассейни. Ал толугу менен ачык асман астында жайгашып, тоолор менен тийишип жаткандай сезим жаратат. Заманбап ашканасы, кеңири залы жана 24 сааттык жеке тейлөөсү сизди падышадай сездирет.",
      EN: "The Royal Celestial Penthouse is engineered for the ultimate high-altitude escape. Highlighted by its private outdoor heated infinity pool that seems to merge with the snowy mountain horizon, it includes double lounges, a customized professional private kitchen, and an around-the-clock personal team.",
      RU: "Королевский Небесный Пентхаус создан для идеального горного уединения. Главная жемчужина — личный подогреваемый инфинити-бассейн под открытым небом, сливающийся с горизонтом. Гостей ожидают двойные гостиные залы и эксклюзивное обслуживание 24/7."
    },
    pricePerNight: 350,
    maxGuests: 6,
    sizeSqm: 320,
    viewType: {
      KG: "Тоолордун 360° тегерек панорамасы",
      EN: "360-degree absolute mountain & valley view",
      RU: "360-градусный круговой обзор гор и долины"
    },
    bedType: {
      KG: "3х Гранд Кинг-Сайз (Экологиялык таза матрацтар)",
      EN: "3x Grand King-Size beds with goose-down topper",
      RU: "3х Grand King-Size с наполнителем из гусиного пуха"
    },
    image: penthouseImg,
    amenities: [
      { KG: "Сырттагы чексиз жылуу бассейн", EN: "Heated outdoor private infinity pool", RU: "Подогреваемый инфинити-бассейн на открытом воздухе" },
      { KG: "Жеке кинотеатр (IMAX сапат)", EN: "Private IMAX cinema screen and sound entertainment", RU: "Частный кинотеатр с IMAX экраном" },
      { KG: "Толук жабдылган элиталык ашкана", EN: "Professional kitchen with custom culinary instruments", RU: "Профессионально оборудованная кухня" },
      { KG: "Түз жеке лифт менен келүү", EN: "Private direct-access secure elevator code", RU: "Индивидуальный высокоскоростной лифт" },
      { KG: "Спа-укалоо бөлмөсү", EN: "In-suite dedicated wellness spa treatment room", RU: "Личный спа-кабинет для массажа" }
    ],
    specialPerk: {
      KG: "Жеке тик учак аянтчасын акысыз пайдалануу мүмкүнчүлүгү",
      EN: "Priority private helipad access & custom schedule",
      RU: "Приоритетный бесплатный доступ к личной вертолетной площадке"
    }
  },
  {
    id: "garden-villa",
    name: {
      KG: "Делюкс Бакча Оазис Вилласы",
      EN: "Deluxe Garden Oasis Villa",
      RU: "Делюкс Вилла Садовый Оазис"
    },
    tagline: {
      KG: "Жаратылыштын кучагындагы бейпил кооздук",
      EN: "Lush botanical hideaway with sensory gardens",
      RU: "Зеленый ботанический рай с полным уединением"
    },
    description: {
      KG: "Экологиялык таза баалуу жыгачтан жасалган, айланасы жапжашыл бакча жана жеке минералдык бассейни бар вилла. Жаратылышты сүйүүчүлөргө.",
      EN: "Crafted with premium teak wood floors, fully automated sliding glass, and integrated into a botanical garden with a geothermal thermal pool.",
      RU: "Роскошная вилла из элитного тикового дерева посреди цветущего тропического сада. Геотермальный бассейн и пение птиц для истинного релакса."
    },
    longDescription: {
      KG: "Бул вилла жаратылыш менен заманбап залкар дизайнын кемчиликсиз айкалышын сунуштайт. Жеке террасаңызда олтуруп, канаттуулардын үнүн уга аласыз. Вилланын ичи табигый таштар, тик жыгачы жана жогорку сапаттагы кездемелер менен кооздолгон.",
      EN: "The Deluxe Garden Oasis Villa is an ecologically conscious design triumph. Teak layouts blend into the pristine mountain greenery. Large sliding glass walls instantly dissolve the boundaries between the high-ceilinged bedroom and your sensory private garden featuring a geothermal plung pool.",
      RU: "Вилла предлагает безупречный баланс экологичности и роскошного комфорта. Стены из редких пород дерева плавно переходят в собственный закрытый сад. Раздвижное панорамное остекление позволяет в один клик объединить вашу спальню с террасой у термального бассейна."
    },
    pricePerNight: 190,
    maxGuests: 4,
    sizeSqm: 180,
    viewType: {
      KG: "Жеке бакча жана шаркыратманын көрүнүшү",
      EN: "Pristine private botanical garden and direct waterfall view",
      RU: "Собственный тропический сад и вид на декоративный водопад"
    },
    bedType: {
      KG: "2х Императордук Кинг-Сайз (Зыгыр кездемеден)",
      EN: "2x Imperial King-Size with organic Belgian linen",
      RU: "2х Imperial King-Size из органического бельгийского льна"
    },
    image: villaImg,
    amenities: [
      { KG: "Геотермалдык минералдык суу бассейни", EN: "Geothermal pure mineral outdoor plunge pool", RU: "Геотермальный минеральный террасный бассейн" },
      { KG: "Ачык асман астындагы романтикалык душ", EN: "Rainforest experience outdoor slate shower", RU: "Экзотический душ под открытым небом из камня" },
      { KG: "Иога жана медитация зонасы", EN: "Zen stone yoga podium & reflection pavilion", RU: "Дзен-площадка для йоги и чайных церемоний" },
      { KG: "Жеке барбекю жана тамактануучу веранда", EN: "Enclosed automated summer dining veranda", RU: "Летняя закрытая веранда для ужинов" },
      { KG: "Чөптөр менен жасалган атайын чай топтому", EN: "Organic mountain herbal apothecary tea bar", RU: "Уникальный фито-чайный уголок с горными травами" }
    ],
    specialPerk: {
      KG: "Күн сайын эртең менен жаңы терилген тоо гүлдөрүнөн композиция сунушталат",
      EN: "Daily bespoke alpine flower compositions curated in-room",
      RU: "Ежедневные свежие горные цветочные композиции на вилле"
    }
  },
  {
    id: "ocean-suite",
    name: {
      KG: "Улуу Океан Представителдик Люкс",
      EN: "Grand Ocean Executive Suite",
      RU: "Гранд Океан Представительский Люкс"
    },
    tagline: {
      KG: "Терең деңиздин көк түстөрү жана алтын кооздук",
      EN: "Majestic deep navy and gold-infused marine suite",
      RU: "Морское величие в темно-синих и золотых тонах"
    },
    description: {
      KG: "Алтын жалатылган деталдар, улуу деңиз түстөрүнүн гармониясы жана океандын чексиз толкундарына караган балкон. Өзгөчө стилдеги тандап алуу.",
      EN: "Infused with stunning gold-leaf finishings, deep navy blue accents, and an expansive balcony hovering right above ocean-blue water panoramas.",
      RU: "Интерьер в благородных темно-синих тонах с сусальным золотом. Просторный видовой балкон, величественно парящий над лазурными водами."
    },
    longDescription: {
      KG: "Улуу Океан Люксу деңиз толкундарынын үнү менен эс алууну артык көргөн коноктор үчүн жаратылган. Тынчтандыруучу океан стилиндеги заманбап эмеректер, жеке аквариум жана күн баткандагы укмуш көрүнүш сөзсүз жүрөгүңүздөн орун алат.",
      EN: "The Grand Ocean Executive Suite is highly rated for its deep therapeutic maritime elements. Designed with premium high-tech acoustical insulation, golden trim fixtures, a luxury marine aquascape, and a dynamic sunrise-facing sun deck suitable for reading, breakfast, or fine tea ceremonies.",
      RU: "Люкс предлагает погрузиться в атмосферу абсолютного морского покоя. Дизайнерская мебель в лазурных тонах, золотые декорации, эксклюзивный морской аквариум превратят ваше утро на просторной палубе в истинное блаженство."
    },
    pricePerNight: 220,
    maxGuests: 4,
    sizeSqm: 210,
    viewType: {
      KG: "Күн чыгышка караткан чексиз океан пейзажы",
      EN: "Stunning sweeping sunrise ocean horizon view",
      RU: "Бескрайний вид на лазурный океанский рассвет"
    },
    bedType: {
      KG: "2х Королдук Кинг-Сайз (Эң жумшак кездеме)",
      EN: "2x Royal King-Size with high-density premium velvet",
      RU: "2х Королевский King-Size с бархатным оголовьем"
    },
    image: oceanImg,
    amenities: [
      { KG: "Океан толкундарына караган ачык терраса", EN: "Suspended sea-sky cantilevered balcony", RU: "Видовой подвесной балкон над водой" },
      { KG: "Экзотикалык эксклюзивдүү аквариум", EN: "Designer live coral aquarium wall", RU: "Уникальный встроенный аквариум с живыми кораллами" },
      { KG: "Премиум Кристалл ваннасы жана душ", EN: "Crystal-block custom soaking bathtub", RU: "Роскошная ванна, высеченная из единого кристалла" },
      { KG: "Акылдуу жарык берүү системасы (RGB)", EN: "Aura smart circadian lighting controls", RU: "Световая система биоритмов Aura" },
      { KG: "Толук деңиз маанайындагы мини-бар", EN: "Ocean-inspired local Caviar and vintage collection", RU: "Премиум мини-бар с черной икрой и шампанским" }
    ],
    specialPerk: {
      KG: "Жеке катер же яхта менен кечки серүүндөө 50% арзандатуу менен",
      EN: "Exclusive 50% discount for private sunrise yacht chartering",
      RU: "Эксклюзивная скидка 50% на аренду частной скоростной яхты"
    }
  }
];

export const LUXURY_SERVICES: LuxuryService[] = [
  {
    id: "heli-transfer",
    name: {
      KG: "VIP Тик учак кызматы (Манас Аэропортунан)",
      EN: "VIP Presidential Helicopter Transfer (Manas Airport)",
      RU: "VIP Вертолетный трансфер (из Аэропорта Манас)"
    },
    description: {
      KG: "Манас аэропортунан мейманкананын жеке аянтчасына 15 мүнөттө коопсуз жана ыңгайлуу учуп келүү.",
      EN: "Elite private transfer from Manas Airport directly to the resort's rooftop helipad in under 15 minutes.",
      RU: "Элитный полет из аэропорта Манас на вертолетную площадку отеля всего за 15 минут с панорамными видами."
    },
    pricePerNight: 120,
    icon: "Helicopter"
  },
  {
    id: "private-butler",
    name: {
      KG: "24/7 Жеке Батлер жана Консьерж кызматы",
      EN: "Personal Butler & Elite Concierge Service 24/7",
      RU: "Личный дворецкий и VIP-консьерж 24/7"
    },
    description: {
      KG: "Сиздин каалоолоруңузду алдын ала билген, кийимдерди ирээттөө, брондорду жасоо боюнча өзгөчө батлер.",
      EN: "Highly trained personal butler anticipating your requirements, organizing exclusive mountain excursions and meals.",
      RU: "Профессиональный дворецкий, предугадывающий желания, помогающий с гардеробом и организующий ваш досуг."
    },
    pricePerNight: 40,
    icon: "UserCheck"
  },
  {
    id: "michelin-chef",
    name: {
      KG: "Атактуу Мишлен Ашпозчусунун Тамактары",
      EN: "Michelin-Starred Personal Chef & Sommelier",
      RU: "Персональный Мишлен-шеф и сомелье"
    },
    description: {
      KG: "Сиз жеке виллаңызда же люксте гастрономиялык шедеврлерди жана коллекциялык суусундуктарды даамдай аласыз.",
      EN: "Enjoy customized organic degustation menus paired with exceptional reserves, served inside your room.",
      RU: "Приготовление ресторанных шедевров высокой кухни прямо во время вашего пребывания, индивидуальное меню с сомелье."
    },
    pricePerNight: 60,
    icon: "ChefHat"
  },
  {
    id: "gold-spa",
    name: {
      KG: "Алыскы Алтын Термалдык Спа & Массаж",
      EN: "Exclusive 24k Gold Thermal Spa & Full Therapy",
      RU: "Эксклюзивный термальный спа и массаж 24k золотом"
    },
    description: {
      KG: "Императордук массаж баалуу алтын майы менен жана минералдык булактарга чексиз убакытта кирүү мүмкүнчүлүгү.",
      EN: "Indulgent deep-tissue therapy utilizing pure 24-carat gold oils and private access to the thermal cave springs.",
      RU: "Королевские ритуалы ухода с маслом 24-каратного золота и безлимитный доступ к термальным источникам."
    },
    pricePerNight: 35,
    icon: "Sparkles"
  }
];

export const CUSTOMIZATION_OPTIONS: CustomizationOption[] = [
  {
    category: "pillow-menu",
    categoryLabel: {
      KG: "Жумшак көптүктөрдү тандоо",
      EN: "Prestige Pillow Menu",
      RU: "Меню элитных подушек"
    },
    choices: [
      { id: "canadian-down", label: { KG: "Канадалык ак каздын мамыгы", EN: "Canadian ultra-soft white goose down", RU: "Канадский пух белого гуся" }, price: 0 },
      { id: "organic-silk", label: { KG: "Табигый мулбери жибеги (Анти-аллерген)", EN: "Organic Mulberry silk core with lavender extract", RU: "Натуральный малбери-шелк с лавандой" }, price: 5 },
      { id: "bamboo-charcoal", label: { KG: "Анатомиялык бамбук көмүрү матрас үчүн", EN: "Anatomical bamboo charcoal therapeutic cooling", RU: "Анатомический бамбуковый уголь" }, price: 3 }
    ]
  },
  {
    category: "welcome-drink",
    categoryLabel: {
      KG: "Келүү күнүндөгү өзгөчө суусундук",
      EN: "High-Tier Welcome Elixir",
      RU: "Приветственный элитный напиток"
    },
    choices: [
      { id: "champagne", label: { KG: "Dom Pérignon vintage 2012 коллекциясы", EN: "Dom Pérignon Vintage 2012 Brut", RU: "Винтажный Dom Pérignon 2012" }, price: 15 },
      { id: "kyrgyz-elixir", label: { KG: "Тоо балы жана Сары-Жаз чөп чай эликсири", EN: "Royal Sary-Jaz mountain honey & herb elixir", RU: "Королевский горный эликсир Сары-Джаз с медом" }, price: 0 },
      { id: "saffron-gold", label: { KG: "Атайын шафран кошулган алтын муздак чай", EN: "Cold-pressed Persian saffron iced tea with gold-leaf", RU: "Холодный персидский шафрановый чай с золотом" }, price: 6 }
    ]
  },
  {
    category: "room-scent",
    categoryLabel: {
      KG: "Бөлмөнүн жыпар жыты",
      EN: "In-Suite Aromatherapy Scents",
      RU: "Природная ароматерапия номера"
    },
    choices: [
      { id: "mountain-pine", label: { KG: "Тянь-Шань карагайы жана арча жыты", EN: "Tien Shan wild spruce and forest juniper", RU: "Тянь-Шаньская дикая ель и можжевельник" }, price: 0 },
      { id: "royal-amber", label: { KG: "Королдук амбра жана назик мадагаскар ванили", EN: "Majestic amber and Madagascan warm vanilla pod", RU: "Королевская амбра и мадагаскарская ваниль" }, price: 4 },
      { id: "oasis-sandwood", label: { KG: "Ароматтуу сандал жыгачы жана ак лотос", EN: "Premium sandalwood bark and white lotus scent", RU: "Императорский сандал и белый лотос" }, price: 4 }
    ]
  },
  {
    category: "floor-preference",
    categoryLabel: {
      KG: "Кабатты тандоо",
      EN: "Floor Elevation Preference",
      RU: "Предпочтение по этажам"
    },
    choices: [
      { id: "high-floor", label: { KG: "Эң жогорку кабат (Бийик панорама)", EN: "Maximum elevation (Highest absolute view)", RU: "Самый высокий этаж (Максимальный обзор)" }, price: 10 },
      { id: "standard-floor", label: { KG: "Орточо кабат (Классикалык макети)", EN: "Elite middle tier residency layout", RU: "Средний этаж (Классический вариант)" }, price: 0 }
    ]
  }
];

export const INITIAL_REVIEWS: GuestReview[] = [
  {
    id: "rev-1",
    guestName: "Александр Волков",
    rating: 5,
    roomName: "Presidential Royal Suite",
    comment: "Невероятный уровень сервиса! Личный дворецкий предусмотрел каждую деталь. Утром нас ждал безупречный завтрак с видом на Тянь-Шаньские вершины. Отдельное спасибо за вертолетный трансфер, сэкономили кучу времени и получили взрыв эмоций!",
    date: "2026-05-18",
    avatarSeed: "alex"
  },
  {
    id: "rev-2",
    guestName: "Emma Harrington",
    rating: 5,
    roomName: "Royal Celestial Penthouse",
    comment: "The rooftop infinity pool is out of this world. Swimming at midnight with the mountain air around us was a magical experience. Altyn Palace truly redefines the definition of a 5-star hotel in Central Asia. Pure perfection.",
    date: "2026-05-29",
    avatarSeed: "emma"
  },
  {
    id: "rev-3",
    guestName: "Айсулуу Кадырова",
    rating: 5,
    roomName: "Deluxe Garden Oasis Villa",
    comment: "Вилла о абдан кооз экен! Балдарыбыз менен сонун эс алдык. Жеке минералдык суусу бар бассейн жана балдарга уюштурулган тоо гүлдөрү аябай жакты. Ашпозчулардын тамактары ушунчалык даамдуу, ар бир күн жомок сыяктуу өттү. Кайра келебиз!",
    date: "2026-06-03",
    avatarSeed: "aisuluu"
  },
  {
    id: "rev-4",
    guestName: "Dmitry Petrov",
    rating: 5,
    roomName: "Grand Ocean Executive Suite",
    comment: "Прекрасный глубокий дизайн. Морской аквариум во всю стену у изголовья кровати успокаивает невероятно. Очень удобная система бронирования здесь на сайте, можно тонко настроить меню подушек и заказать трансфер в два клика. Рекомендую всем сомелье-меню!",
    date: "2026-06-08",
    avatarSeed: "dmitry"
  },
  {
    id: "rev-5",
    guestName: "Мирлан Токтосунов",
    rating: 5,
    roomName: "Presidential Royal Suite",
    comment: "Мынчалык жогорку деңгээлдеги коопсуздукту жана сый-урматты эч жерден көргөн эмесмин! Гүлжан айымдын өз колу менен түзүлгөн Altyn Palace - чыныгы улуттук сыймык. Вертолет аркылуу тоо аралап келген серүүндөө жана ашпозчунун кыргыз деликатестери унутулгус элес калтырды.",
    date: "2026-06-09",
    avatarSeed: "mirlan"
  },
  {
    id: "rev-6",
    guestName: "Sir Richard Thompson",
    rating: 5,
    roomName: "Deluxe Garden Oasis Villa",
    comment: "Enchanting escape organized to perfection. Founder Guljan has established an oasis where the beautiful natural springs of Kyrgyzstan meet world-beating Swiss style and discretion. The online AI Concierge made picking premium custom amenities seamless. Outstanding!",
    date: "2026-06-10",
    avatarSeed: "richard"
  }
];

export const TRANSLATIONS: Record<string, MultilingualText> = {
  // Navigation / Headers
  brandName: { KG: "Altyn Palace", EN: "Altyn Palace", RU: "Altyn Palace" },
  brandSubtitle: { KG: "5-Жылдыздуу Люкс Курорт & Спа", EN: "5-Star Luxury Resort & Spa", RU: "5-Звездочный Люкс Курорт & Спа" },
  navHome: { KG: "Башкы бет", EN: "Home", RU: "Главная" },
  navRooms: { KG: "Люкс бөлмөлөр", EN: "Luxury Suites", RU: "Люксы" },
  navBookings: { KG: "Менин брондорум", EN: "My Bookings", RU: "Мои брони" },
  navReviews: { KG: "Коноктордун пикири", EN: "Guest Reviews", RU: "Отзывы" },
  navContact: { KG: "Консьерж кызматы", EN: "Concierge Desk", RU: "Консьерж-служба" },
  navSpaPool: { KG: "Бассейн & СПА", EN: "Pool & Spa", RU: "Бассейн и СПА" },
  
  // Hero section
  heroTitle: { KG: "Гранд бейпилдиктин жана кымбатчылыктын мекени", EN: "The Sanctuary of Uncompromised Grandeur", RU: "Обитель бескомпромиссного величия и роскоши" },
  heroSubtitle: { KG: "Ала-Тоо тоолорунун этегинде жайгашкан уникалдуу 5-жылдыздуу курорт. Ар бир деталда сиздин ыңгайлуулугуңуз үчүн падышалык кам көрүү камтылган.", EN: "Woven into the breath of majestic mountain peaks. A legendary boutique destination where ancient hospitality blends with modern ultra-luxury and absolute discretion.", RU: "Расположенный у подножия величественных гор Ала-Тоо, наш курорт предлагает уединение королевского уровня, где бережно хранят традиции истинного гостеприимства." },
  btnExploreSuites: { KG: "Бөлмөлөрдү көрүү", EN: "Browse Royal Suites", RU: "Смотреть Люксы" },
  btnBookNow: { KG: "Уникалдуу Брондоо", EN: "Book Exclusively", RU: "Забронировать сейчас" },
  
  // Applet highlights
  perkNights: { KG: "Түн", EN: "nights", RU: "ночей" },
  perkSqm: { KG: "кв. метр", EN: "sqm", RU: "кв. м" },
  perkMaxGuests: { KG: "конок алганга чейин", EN: "max guests", RU: "макс. гостей" },
  perkView: { KG: "Терезе көрүнүшү", EN: "Scenic outlook", RU: "Вид из окон" },
  perkBed: { KG: "Төшөк түрү", EN: "Bedding type", RU: "Конфигурация кроватей" },
  perkSpecialBenefit: { KG: "Падышалык белек", EN: "Royal Privilege", RU: "Королевская привилегия" },
  perkIncluded: { KG: "Бөлмөдө камтылган кызматтар", EN: "Suite Inclusive Luxuries", RU: "Услуги, включенные в люкс" },
  ratingLabel: { KG: "5-жылдыздуу сунушталган", EN: "Five-Star Certified Luxury", RU: "Сертифицированная роскошь 5★" },
  
  // Filters section
  filterTitle: { KG: "Өзүңүздүн бейишиңизди табыңыз", EN: "Discover Your Royal Hideaway", RU: "Найдите свой уединенный рай" },
  filterSubtitle: { KG: "Баасы же конок саны боюнча ыңгайлуу люкс бөлмөлөрдү тандаңыз", EN: "Refine your expectations by price preference or maximum occupancy standards", RU: "Отфильтруйте наши роскошные апартаменты по стоимости или количеству гостей" },
  lblAllSuite: { KG: "Бардык люкс бөлмөлөр", EN: "Show All Suites", RU: "Все предложения" },
  lblMaxPrice: { KG: "Максималдуу баа:", EN: "Maximum rate per night:", RU: "Максимальная цена за ночь:" },
  lblGuestsCount: { KG: "Минималдуу сыйымдуулук:", EN: "Minimum Guest Capacity:", RU: "Минимальное кол-во гостей:" },
  
  // Unique Customizer
  customizerTitle: { KG: "Уникалдуу Бөлмө Тандоо жана Стилдештирүү", EN: "Bespoke Suite Personalization", RU: "Персональная кастомизация номера" },
  customizerSubtitle: { KG: "Келүү күнүңүз алдында бөлмөңүздү толук ыңгайлаштырыңыз. Биз ар бир майда-чүйдөсүнө чейин даярдайбыз.", EN: "Shape your residence options entirely before dynamic entry. Your selected items will be hand-crafted and prepared by specialized concierges.", RU: "Настройте каждую деталь номера под свои индивидуальные пожелания еще до заезда. Команда консьержей приготовит всё в лучшем виде." },
  selectedSuite: { KG: "Тандалган бөлмө:", EN: "Selected Suite Residence:", RU: "Выбранный люкс:" },
  configureRoom: { KG: "Люксту ыңгайлаштыруу", EN: "Personalize Suite Configuration", RU: "Настроить параметры люкса" },
  premiumServices: { KG: "Элиталык Кошумча Кызматтар (Күн сайын)", EN: "Elite VIP Services (Daily rate per service)", RU: "Элитные VIP-услуги (оплата посуточно)" },
  servicesSubtitle: { KG: "Эс алууңузду толук жайлуу кылуу үчүн премиум кызматтарды кошуңуз", EN: "Elevate your residency standards by adding 5-star customized activities or butler details", RU: "Добавьте эксклюзивные услуги, чтобы сделать отдых по-настоящему безупречным" },
  btnCustomizeNext: { KG: "Маалыматтарга өтүү", EN: "Proceed to Guest Ledger", RU: "Перейти к вводу данных" },
  btnCustomizeBack: { KG: "Артка", EN: "Return to Selection", RU: "Назад" },
  
  // Checkout Form
  ledgerTitle: { KG: "Кылдаттык менен Каттоо Дәптери", EN: "Private Guest Reservation Ledger", RU: "Книга регистрации гостей" },
  ledgerSubtitle: { KG: "Сураныч, байланыш маалыматыңызды жазыңыз. Биздин улуу консьержа сизге 10 мүнөттө байланышат.", EN: "Please finalize your certified security details below. Our senior head concierge will connect directly for custom dining menus.", RU: "Пожалуйста, заполните контактные данные. Наш шеф-консьерж свяжется с вами для согласования меню и времени прибытия." },
  lblfullName: { KG: "Урматтуу коноктун толук аты-жөнү", EN: "Full Guest Name (as in VIP Passport)", RU: "ФИО уважаемого гостя (как в паспорте)" },
  lblEmail: { KG: "Электрондук почта", EN: "Secure Guest Email Address", RU: "E-mail адрес" },
  lblPhone: { KG: "Телефон номери", EN: "Direct Contact Phone Number", RU: "Номер телефона" },
  lblDates: { KG: "Келүү жана кетүү күндөрү", EN: "Desired Residency Dates", RU: "Даты пребывания" },
  lblCheckIn: { KG: "Кирүү күнү", EN: "Arrival Check-In", RU: "Дата заезда" },
  lblCheckOut: { KG: "Чыгуу күнү", EN: "Departure Check-Out", RU: "Дата выезда" },
  lblNights: { KG: "Жалпы түн саны:", EN: "Total nights calculated:", RU: "Всего вычислено ночей:" },
  lblGuests: { KG: "Улуу жана жаш коноктордун саны", EN: "Registered Lodge Guests", RU: "Зарегистрированные гости" },
  lblAdults: { KG: "Чоңдор", EN: "Adults (18+)", RU: "Взрослые (18+)" },
  lblChildren: { KG: "Балдар", EN: "Children (0-17)", RU: "Дети (0-17)" },
  lblNotes: { KG: "Атайын падышалык кошумча өтүнүчтөр", EN: "Bespoke Dining / Secret Security Requests", RU: "Особые пожелания гостя / Секретная безопасность" },
  placeholderNotes: { KG: "Мисалы: өзгөчө гүлдөр, тамак-аш аллергиясы же коопсуздук конвойлору...", EN: "For example: extreme food allergies, specific temperature guidelines, or VIP security escorts...", RU: "Например: сильные пищевые аллергии, конкретные требования к температуре или сопровождение охраны..." },
  btnSubmitBooking: { KG: "Брондоону Сыймык Менен Аяктоо", EN: "Finalize Certified Elite Residency", RU: "Завершить бронирование люкса" },
  
  // Booking status
  calcBasePrice: { KG: "Бөлмөнүн баасы (түнүнө х түн саны):", EN: "Base suite balance (rate x nights):", RU: "Базовый баланс люкса (цена х ночи):" },
  calcServices: { KG: "Кошумча VIP кызматтар:", EN: "Added VIP premium services:", RU: "Добавленные VIP-услуги:" },
  calcCustom: { KG: "Ыңгайлаштыруу кошумчалары:", EN: "Bespoke chosen upgrade items:", RU: "Улучшения индивидуальной сборки:" },
  calcTotal: { KG: "Жалпы төлөм балансы:", EN: "Total Certified Balance:", RU: "Общий баланс к оплате:" },
  freeService: { KG: "Акысыз кошуу", EN: "Included with luxury complimentary status", RU: "Включено бесплатно" },
  
  // Booking confirmation modal / view
  successTitle: { KG: "Падышалык Брондоо Сыймык менен Кабыл Алынды!", EN: "Bespoke Royal Booking Triumphantly Registered!", RU: "Бронирование успешно зарегистрировано!" },
  successSubtitle: { KG: "Төмөндө сиздин расмий брондоо кодуңуз жана маалыматыңыз. Биздин шеф-консьерж сизге чалат.", EN: "Your official VIP validation records are generated below. Our head concierge has been dispatched to coordinate menus.", RU: "Регистрация прошла успешно. Уникальный VIP-код сгенерирован ниже. Наш консьерж свяжется с вами в течение 10 минут." },
  bookingCodeLbl: { KG: "Курорттук каттоонун VIP коду:", EN: "Resort Certified Registry VIP Code:", RU: "VIP-код бронирования номеров:" },
  bookingStatusLbl: { KG: "Брондоо статусу:", EN: "Registry Priority Status:", RU: "Приоритетный статус:" },
  statusConfirmed: { KG: "Аныкталды & Курорт Даярдалууда", EN: "Confirmed & Butler Assigned", RU: "Подтверждено и дворецкий назначен" },
  btnCloseSuccess: { KG: "Бөлмөлөргө кайтуу", EN: "Return to Suite Index", RU: "Вернуться к списку люксов" },
  
  // My Bookings screen
  myBookingsTitle: { KG: "Сиздин Падышалык Резиденция Паспортторуңуз", EN: "Your Certified Sanctuary Portfolios", RU: "Ваши зарегистрированные визиты" },
  myBookingsEmpty: { KG: "Сизде азырынча брондоо жок. Биздин эң сонун люкс бөлмөлөрдү брондоңуз!", EN: "Your dynamic guest ledger is currently empty. Explore our luxurious royal options above!", RU: "История визитов пуста. Ознакомьтесь с великолепными королевскими люксами на главной странице!" },
  btnCancelRes: { KG: "Бронду жокко чыгаруу", EN: "Dissolve Certified Reservation", RU: "Аннулировать бронирование" },
  cancelConfirm: { KG: "Бул падышалык резервацияны жокко чыгарууга толук ишенип жатасызбы?", EN: "Are you certain you wish to dissolve this verified luxury reservation?", RU: "Вы уверены, что хотите отменить это бронирование класса люкс?" },
  
  // Reviews screen
  reviewsTitle: { KG: "Дүйнөлүк Элиталык Коноктордун Пикири", EN: "Verified Chronicles of International Guests", RU: "Летопись отзывов международных гостей" },
  reviewsSubtitle: { KG: "Биздин курорттогу унутулгус күндөр тууралуу чыныгы коноктордун ой-пикирлери", EN: "Genuine emotional declarations shared by certified VIP residents and global royalty", RU: "Подлинные мнения уважаемых гостей, побывавших в нашем курортном оазисе" },
  btnLeaveReview: { KG: "Пикириңизди калтырыңыз", EN: "Inscribe Your Golden Thoughts", RU: "Оставить свой золотой отзыв" },
  reviewFormTitle: { KG: "Бейпилдикти Баалоо Дептери", EN: "Guest Experience Golden Registry", RU: "Книга отзывов почетного гостя" },
  revNameLbl: { KG: "Сиздин ысмыңыз", EN: "Your Respected Signature Name", RU: "Ваше уважаемое имя" },
  revSuiteLbl: { KG: "Кайсы люксте эс алдыңыз?", EN: "Which Royal Suite Did You Inhabit?", RU: "В каком люксе вы отдыхали?" },
  revRatingLbl: { KG: "Бейпилилдик жана Тейлөө Баасы", EN: "Lodge Comfort and Service Appraisal", RU: "Оценка комфорта и обслуживания" },
  revCommentLbl: { KG: "Ой-толгоолоруңуз менен бөлүшүңүз", EN: "Describe Your Mystical Stay", RU: "Опишите свои впечатления" },
  revSubmitBtn: { KG: "Пикирди Сыймык Менен Кошуу", EN: "Publish Golden Review", RU: "Опубликовать золотой отзыв" },
  revSuccessMsg: { KG: "Пикириңиз мейманкана тарыхына ийгиликтүү кошулду!", EN: "Your golden commentary has been preserved inside our history log!", RU: "Ваши слова благодарности внесены в летопись отеля!" },
  
  // Contact page
  contactTitle: { KG: "Ала-Тоо Гранд Консьерж Столу", EN: "Head Concierge Grand Reception", RU: "Служба шеф-консьержа Altyn Palace" },
  contactSubtitle: { KG: "Башкы консьерж Уланбек Чолуров сизге атайын сунуштар, коопсуздук деталдары жана жеке менюларды түзүүдө жардам берет.", EN: "Senior Head Concierge Ulanbek Cholurov will curate custom routes, special caviar requests, and private flight authorizations.", RU: "Шеф-консьерж Уланбек Чолуров организует персональные экскурсии, доставку редких деликатесов и любые полетные согласования." },
  conInquiryBtn: { KG: "Консьерж менен Чат же Сурам", EN: "Deploy Secure Priority Query", RU: "Отправить запрос в консьерж-службу" },
  conInquiryTitle: { KG: "Түз Суроо Жөнөтүү", EN: "Direct High-Priority Inquiry", RU: "Прямой высокоприоритетный запрос" },
  conMessageLbl: { KG: "Кабарыңыз же Сизге Керектүү Муктаждыктар", EN: "Bespoke Requests or Charter Demands", RU: "Индивидуальные требования или спецификации" },
  conSuccessMsg: { KG: "Сурооңуз кабыл алынды. Башкы консьерж сизге 5 мүнөттөн кийин жооп берет.", EN: "Your priority query is routed. The head concierge will notify you on secure networks shortly.", RU: "Ваш запрос передан лично шеф-консьержу. Ответ поступит на ваш терминал в течение 5 минут." },
  
  // Footer elements / Amenities banner
  amenTitle: { KG: "Ар бир конокко улуу кам көрүү убадасы", EN: "Unending Pledges of Five-Star Majesty", RU: "Вековое обещание пятизвездного величия" },
  amenSubtitle: { KG: "Мейманкананын бардык аймагында сизге акысыз сунушталган эң жогорку кызматтар", EN: "Ultra-luxurious amenities bundled automatically with every reservation status", RU: "Эксклюзивные преимущества, сопровождающие любое бронирование по умолчанию" },
  amen1Title: { KG: "Абсолюттук коопсуздук", EN: "High-Grade Absolute Shield", RU: "Абсолютная безопасность" },
  amen1Desc: { KG: "Заманбап күзөт, жекече купуялуулук жана жогорку калибрлүү коопсуздук кызматтары.", EN: "Comprehensive military-grade electronic defenses, absolute guest NDA logs, and VIP escorts.", RU: "Закрытая охраняемая территория, полная конфиденциальность гостей и защита персональных файлов." },
  amen2Title: { KG: "Минералдык булактар жана Спа", EN: "Mineral Springs Waterway", RU: "Термальные источники и спа" },
  amen2Desc: { KG: "Жер астындагы тоо булактарынан келген таза дарылык касиети бар суу кошулган бассейн терапиялары.", EN: "Direct natural thermal cave water flows feeding our complex indoor hydrotherapy, hot stone beds.", RU: "Собственные природные термальные резервуары с минеральной лечебной водой и бальнео-комнаты." },
  amen3Title: { KG: "Мишлен Гастрономиясы", EN: "Prestige Dining Collection", RU: "Гастрономия Мишлен" },
  amen3Desc: { KG: "Тянь-Шаньдын органикалык таза продуктуларынан уюштурулган эң улуу ресторан тамактары.", EN: "Exquisite culinary landscapes using certified peak mountain organic ingredients and rare wild herbs.", RU: "Рестораны высокой кухни, использующие органические чистейшие продукты с альпийских лугов." },
  
  // Quick facts
  fact1Title: { KG: "Бийиктик", EN: "Elevation", RU: "Высота" },
  fact1Val: { KG: "1600 метр тоо койну", EN: "1,600m above sea level", RU: "1600 м над уровнем моря" },
  fact2Title: { KG: "Жер тилкеси", EN: "Estate Area", RU: "Территория" },
  fact2Val: { KG: "12 гектар жашыл оазис", EN: "12 Hectares of Botanical Zen", RU: "12 гектаров ботанического рая" },
  fact3Title: { KG: "Жеке Термалдык Булактар", EN: "Geothermal Springs", RU: "Термальные источники" },
  fact3Val: { KG: "4 дарылык жылуу булак", EN: "4 Pure Geothermal Pools", RU: "4 целебных горячих источника" },
  fact4Title: { KG: "Канааттануу көрсөткүчү", EN: "Registry Rating", RU: "Рейтинг удовлетворенности" },
  fact4Val: { KG: "5.0 Мүчүлүшсүз Кызмат", EN: "5.0 Flawless guest index", RU: "5.0 Безупречный индекс гостей" },

  // Helper labels
  selectBtn: { KG: "Ушул Люксту Тандоо", EN: "Select This Residence", RU: "Выбрать этот вариант" },
  totalText: { KG: "Жалпы баасы:", EN: "Calculated balance:", RU: "Расчетная стоимость:" },
  perNight: { KG: "Ар бир түнгө / ", EN: "per night / ", RU: "за ночь / " },
  capacityLabel: { KG: "Коноктор:", EN: "Guests:", RU: "Количество гостей:" },
  sizeLabel: { KG: "Аянты:", EN: "Area:", RU: "Площадь номеров:" },
  viewLabel: { KG: "Көрүнүшү:", EN: "Outlook view:", RU: "Вид из номера:" },
  bedLabel: { KG: "Төшөк:", EN: "Bedding luxury:", RU: "Конфигурация спальни:" },

  // Spa & Pool Dedicated Section Translations
  spaPoolTitle: { KG: "Падышалык Термалдык Бассейн жана Алтын Спа Салону", EN: "Imperial Thermal Pool & 24k Gold Spa Salons", RU: "Королевский бассейн и золотые СПА-салоны" },
  spaPoolSubtitle: { KG: "Табигый геотермалдык суулар жана элиталык терапия аркылуу Ала-Тоонун кооз кучагында толук эс алыңыз.", EN: "Indulge in 5-star mountain wellness where restorative thermal hot mineral springs meet pure organic 24-carat gold therapies.", RU: "Погрузитесь в истинный покой с целебными термальными источниками и омолаживающими ритуалами из 24-каратного золота." },
  poolSectionTitle: { KG: "Ысык Термалдык Инфинити-Бассейн", EN: "Heated Geothermal Infinity Pool", RU: "Термальный инфинити-бассейн" },
  poolSectionDesc: { KG: "Жыл бою 38°C жылуулукта турган сырткы термалдык бассейн. Тоо булагынан келген тунук минералдык суу жана капчыгайдын 360° тегерек панорамасы сиздин денеңизге жаңы күч-кубат тартуулайт. Суунун курамы дарылык касиетке ээ.", EN: "Restoring geothermal mountain springwater heated constantly to a beautiful 38°C. Swimmers can drift over the alpine clouds with an expansive 360° view of snowy peaks and dense juniper forests.", RU: "Круглогодичный открытый термальный бассейн с чистейшей минеральной водой горного источника, подогреваемой до 38°C. Из чаши бассейна открывается захватывающая дух панорама ущелья." },
  spaSectionTitle: { KG: "24-Караттык Алтын Спа Салондору", EN: "Prestige 24k Gold Spa Clinics", RU: "Премиальные СПА-салоны 24 карата" },
  spaSectionDesc: { KG: "Дүйнөлүк класстагы терапевттердин колунан жасалган элиталык массаж. Биздин салондо баалуу 24к сусаль алтыны кошулган органикалык майлар, ысык тоо базальт таштары жана дарылык чөптөр колдонулат. Жан дүйнө жана дене сулуулугу үчүн касиеттүү жай.", EN: "Rejuvenating full-body deep tissue massage incorporating heated organic 24-carat gold oils and warm local volcanic basalt stones. Hand-tailored to stimulate circadian rhythms and absolute cellular recovery.", RU: "Элитные спа-ритуалы и массаж с подогретым маслом 24-каратного золота и теплыми базальтовыми камнями от профессионалов мирового уровня для абсолютной перезагрузки тела и духа." }
};
