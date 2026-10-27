/**
 * ============================================================
 *  DÖNERBROS – BESTELL-MENÜ (Single Source of Truth)
 * ============================================================
 *  Alle Produkte, Preise und Bestell-Einstellungen werden NUR hier gepflegt.
 *  - price: Preis in Euro (Zahl, z.B. 7.5 = 7,50 €)
 *  - name / desc: pro Sprache (de / en / tr)
 *
 *  TODO: Die Preise unten sind PLATZHALTER und müssen durch die
 *        echte Speisekarte ersetzt werden.
 * ============================================================
 */

export const ORDER_SETTINGS = {
    whatsappNumber: '491789209116',   // Ziel-Nummer für Bestellungen (ohne +, ohne 0)
    whatsappDisplay: '+49 178 9209116',
    currency: 'EUR',
    delivery: {
        enabled: true,
        fee: 0,              // Liefergebühr in € (0 = kostenlos)
        minOrder: 15,        // Mindestbestellwert für Lieferung in €
    },
    pickup: {
        enabled: true,
        address: 'Kaiser-Friedrich-Straße 48, 10627 Berlin',
    },
};

export const MENU_CATEGORIES = [
    { id: 'doner', label: { de: 'Döner & Dürüm', en: 'Döner & Dürüm', tr: 'Döner & Dürüm' } },
    { id: 'teller', label: { de: 'Teller & Boxen', en: 'Plates & Boxes', tr: 'Tabak & Box' } },
    { id: 'burger', label: { de: 'Burger', en: 'Burgers', tr: 'Burger' } },
    { id: 'vegan', label: { de: 'Vegan & Veggie', en: 'Vegan & Veggie', tr: 'Vegan & Vejetaryen' } },
    { id: 'sides', label: { de: 'Beilagen & Getränke', en: 'Sides & Drinks', tr: 'Yan Ürünler & İçecekler' } },
];

export const MENU_ITEMS = [
    // ---------- Döner & Dürüm ----------
    {
        id: 'doner-kalb', category: 'doner', price: 7.5, image: '/menu-beef-doner.png', popular: true,
        name: { de: 'Kalbfleisch Döner', en: 'Veal Döner', tr: 'Dana Döner' },
        desc: {
            de: 'Frisch vom Spieß, im knusprigen Fladenbrot mit Salat und Sauce nach Wahl.',
            en: 'Fresh off the spit in crispy flatbread with salad and sauce of your choice.',
            tr: 'Şişten taze, çıtır ekmek arasında salata ve seçtiğiniz sos ile.',
        },
    },
    {
        id: 'doner-chicken', category: 'doner', price: 7.0, image: '/menu-chicken-doner.png',
        name: { de: 'Hähnchen Döner', en: 'Chicken Döner', tr: 'Tavuk Döner' },
        desc: {
            de: 'Saftiges Hähnchen in Spezialmarinade, Fladenbrot, Salat und Sauce.',
            en: 'Juicy chicken in special marinade, flatbread, salad and sauce.',
            tr: 'Özel marineli sulu tavuk, ekmek, salata ve sos.',
        },
    },
    {
        id: 'durum-kalb', category: 'doner', price: 8.5, image: '/menu-mixed-doner.png',
        name: { de: 'Dürüm Kalb', en: 'Veal Dürüm', tr: 'Dana Dürüm' },
        desc: {
            de: 'Im dünnen Yufka gerollt, mit frischem Salat und hausgemachter Sauce.',
            en: 'Rolled in thin yufka with fresh salad and homemade sauce.',
            tr: 'İnce yufkaya sarılmış, taze salata ve ev yapımı sos ile.',
        },
    },

    // ---------- Teller & Boxen ----------
    {
        id: 'doner-teller', category: 'teller', price: 12.5, image: '/menu-mixed-doner.png', popular: true,
        name: { de: 'Döner Teller', en: 'Döner Plate', tr: 'Döner Tabağı' },
        desc: {
            de: 'Döner-Fleisch mit Reis oder Pommes, Salat und zwei Saucen.',
            en: 'Döner meat with rice or fries, salad and two sauces.',
            tr: 'Pilav veya patates, salata ve iki sos ile döner eti.',
        },
    },
    {
        id: 'doner-box', category: 'teller', price: 8.0, image: '/menu-street-food.png',
        name: { de: 'Döner Box', en: 'Döner Box', tr: 'Döner Box' },
        desc: {
            de: 'Pommes und Döner-Fleisch in der Box, mit Sauce nach Wahl.',
            en: 'Fries and döner meat in a box with sauce of your choice.',
            tr: 'Kutuda patates ve döner eti, seçtiğiniz sos ile.',
        },
    },

    // ---------- Burger ----------
    {
        id: 'cheeseburger', category: 'burger', price: 10.5, image: '/menu-burgers.png',
        name: { de: 'Cheese Burger', en: 'Cheese Burger', tr: 'Cheeseburger' },
        desc: {
            de: 'Saftiges Rindfleisch-Patty, Cheddar, Salat, Tomate, Hausdressing.',
            en: 'Juicy beef patty, cheddar, lettuce, tomato, house dressing.',
            tr: 'Sulu dana köfte, cheddar, marul, domates, özel sos.',
        },
    },
    {
        id: 'crispy-chicken-burger', category: 'burger', price: 9.5, image: '/menu-street-food.png',
        name: { de: 'Crispy Chicken Burger', en: 'Crispy Chicken Burger', tr: 'Çıtır Tavuk Burger' },
        desc: {
            de: 'Knuspriges Hähnchen, Coleslaw und scharfe Mayo.',
            en: 'Crispy chicken, coleslaw and spicy mayo.',
            tr: 'Çıtır tavuk, coleslaw ve acılı mayonez.',
        },
    },

    // ---------- Vegan & Veggie ----------
    {
        id: 'vegan-doner', category: 'vegan', price: 8.0, image: '/menu-vegan.png',
        name: { de: 'Veganer Döner', en: 'Vegan Döner', tr: 'Vegan Döner' },
        desc: {
            de: '100% pflanzlich, fein gewürzt, mit veganer Sauce und frischem Salat.',
            en: '100% plant-based, finely seasoned, with vegan sauce and fresh salad.',
            tr: '%100 bitkisel, özel baharatlı, vegan sos ve taze salata ile.',
        },
    },
    {
        id: 'falafel', category: 'vegan', price: 7.0, image: '/menu-falafel.png',
        name: { de: 'Falafel im Brot', en: 'Falafel Sandwich', tr: 'Falafel Ekmek' },
        desc: {
            de: 'Knusprige Falafel, Hummus, Salat und Tahini-Sauce.',
            en: 'Crispy falafel, hummus, salad and tahini sauce.',
            tr: 'Çıtır falafel, humus, salata ve tahin sos.',
        },
    },

    // ---------- Beilagen & Getränke ----------
    {
        id: 'pommes', category: 'sides', price: 3.5, image: '/menu-street-food.png',
        name: { de: 'Pommes Frites', en: 'French Fries', tr: 'Patates Kızartması' },
        desc: { de: 'Knusprig, goldbraun.', en: 'Crispy and golden.', tr: 'Çıtır ve altın renkli.' },
    },
    {
        id: 'ayran', category: 'sides', price: 2.0, image: '/menu-vegan.png',
        name: { de: 'Ayran', en: 'Ayran', tr: 'Ayran' },
        desc: { de: 'Erfrischendes Joghurtgetränk (0,25 l).', en: 'Refreshing yogurt drink (0.25 l).', tr: 'Ferahlatıcı ayran (0,25 l).' },
    },
    {
        id: 'softdrink', category: 'sides', price: 2.5, image: '/menu-burgers.png',
        name: { de: 'Softdrink 0,33 l', en: 'Soft Drink 0.33 l', tr: 'Meşrubat 0,33 l' },
        desc: { de: 'Cola, Fanta oder Sprite.', en: 'Cola, Fanta or Sprite.', tr: 'Kola, Fanta veya Sprite.' },
    },
];

export const formatPrice = (value, lang = 'de') =>
    new Intl.NumberFormat(lang === 'en' ? 'en-IE' : lang === 'tr' ? 'tr-TR' : 'de-DE', {
        style: 'currency',
        currency: ORDER_SETTINGS.currency,
    }).format(value);
