import React, { useEffect, useMemo, useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, Store, Bike, ArrowRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { ORDER_SETTINGS, formatPrice } from '../data/menu';
import './Cart.css';

const WA_ICON = (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.43 9.43 0 1 1 7.99 4.42zm8.02-17.45A11.33 11.33 0 0 0 12.05.72C5.8.72.71 5.8.71 12.05c0 2 .52 3.95 1.52 5.67L.62 23.28l5.7-1.5a11.3 11.3 0 0 0 5.42 1.38h.01c6.25 0 11.34-5.08 11.34-11.33 0-3.03-1.18-5.87-3.32-8.01z" />
    </svg>
);

const initialForm = { name: '', phone: '', street: '', zip: '', time: 'asap', timeValue: '', payment: 'cash', notes: '' };

const Cart = () => {
    const { t, lang } = useLanguage();
    const { lines, count, subtotal, addItem, removeItem, deleteItem, clearCart, isOpen, openCart, closeCart, lastAdded } = useCart();
    const [step, setStep] = useState('cart'); // 'cart' | 'checkout' | 'done'
    const [orderType, setOrderType] = useState(ORDER_SETTINGS.pickup.enabled ? 'pickup' : 'delivery');
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [bump, setBump] = useState(false);

    const { delivery, showPrices } = ORDER_SETTINGS;
    const deliveryFee = orderType === 'delivery' ? delivery.fee : 0;
    const total = subtotal + deliveryFee;
    const belowMin = showPrices && orderType === 'delivery' && subtotal < delivery.minOrder;

    // Bump animation for the floating bar when an item is added
    useEffect(() => {
        if (!lastAdded) return;
        setBump(true);
        const tm = setTimeout(() => setBump(false), 450);
        return () => clearTimeout(tm);
    }, [lastAdded]);

    // Lock body scroll while drawer is open + ESC to close
    useEffect(() => {
        if (!isOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKey = (e) => e.key === 'Escape' && closeCart();
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener('keydown', onKey);
        };
    }, [isOpen, closeCart]);

    // Reset to cart step whenever the drawer is closed
    useEffect(() => {
        if (!isOpen && step !== 'cart') {
            const tm = setTimeout(() => setStep('cart'), 400);
            return () => clearTimeout(tm);
        }
    }, [isOpen, step]);

    const update = (field) => (e) => {
        setForm(f => ({ ...f, [field]: e.target.value }));
        setErrors(er => ({ ...er, [field]: undefined }));
    };

    const validate = () => {
        const er = {};
        if (!form.name.trim()) er.name = true;
        if (!/^[+\d][\d\s/-]{5,}$/.test(form.phone.trim())) er.phone = true;
        if (orderType === 'delivery') {
            if (!form.street.trim()) er.street = true;
            if (!/^\d{5}$/.test(form.zip.trim())) er.zip = true;
        }
        if (form.time === 'later' && !form.timeValue) er.timeValue = true;
        setErrors(er);
        return Object.keys(er).length === 0;
    };

    // WhatsApp message is always written in German so the shop gets a consistent format
    const buildMessage = () => {
        const f = (v) => formatPrice(v, 'de');
        const out = [];
        out.push('🛎️ *NEUE BESTELLUNG – Dönerbros*');
        out.push('');
        out.push(orderType === 'delivery' ? '🛵 *Lieferung*' : '🏪 *Abholung*');
        out.push('');
        lines.forEach(({ item, qty, lineTotal }) => {
            if (showPrices) {
                out.push(`${qty}× ${item.name.de} — ${f(lineTotal)}`);
            } else {
                out.push(`${qty}× ${item.name.de}`);
            }
        });
        if (showPrices) {
            out.push('──────────');
            out.push(`Zwischensumme: ${f(subtotal)}`);
            if (orderType === 'delivery') out.push(`Liefergebühr: ${deliveryFee ? f(deliveryFee) : 'kostenlos'}`);
            out.push(`*Gesamt: ${f(total)}*`);
        }
        out.push('');
        out.push(`👤 ${form.name.trim()}`);
        out.push(`📞 ${form.phone.trim()}`);
        if (orderType === 'delivery') out.push(`📍 ${form.street.trim()}, ${form.zip.trim()} Berlin`);
        out.push(`⏰ ${form.time === 'asap' ? 'So schnell wie möglich' : `Um ${form.timeValue} Uhr`}`);
        out.push(`💳 ${form.payment === 'cash' ? 'Barzahlung' : 'Kartenzahlung'}`);
        if (form.notes.trim()) out.push(`📝 ${form.notes.trim()}`);
        return out.join('\n');
    };

    const submitOrder = (e) => {
        e.preventDefault();
        if (belowMin || !validate()) return;
        const url = `https://wa.me/${ORDER_SETTINGS.whatsappNumber}?text=${encodeURIComponent(buildMessage())}`;
        window.open(url, '_blank', 'noopener');
        setStep('done');
        clearCart();
        setForm(initialForm);
    };

    const minDiff = useMemo(() => Math.max(0, delivery.minOrder - subtotal), [delivery.minOrder, subtotal]);

    return (
        <>
            {/* Floating cart bar */}
            {count > 0 && !isOpen && (
                <button id="floating-cart-btn" className={`floating-cart ${bump ? 'bump' : ''}`} onClick={openCart}>
                    <span className="floating-cart-icon">
                        <ShoppingBag size={20} />
                        <span className="floating-cart-count">{count}</span>
                    </span>
                    <span className="floating-cart-label">{t('cart_view')}</span>
                    {showPrices ? (
                        <span className="floating-cart-total">{formatPrice(subtotal, lang)}</span>
                    ) : (
                        <span className="floating-cart-total">{count}×</span>
                    )}
                </button>
            )}

            {/* Drawer */}
            <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={closeCart} aria-hidden={!isOpen}></div>
            <aside className={`cart-drawer ${isOpen ? 'open' : ''}`} aria-label={t('cart_title')} aria-hidden={!isOpen}>
                <header className="cart-header">
                    {step === 'checkout' ? (
                        <button id="cart-back-btn" className="cart-icon-btn" onClick={() => setStep('cart')} aria-label={t('cart_back')}>
                            <ChevronLeft size={22} />
                        </button>
                    ) : <ShoppingBag size={22} className="cart-header-icon" />}
                    <h2 className="cart-title">{step === 'checkout' ? t('checkout_title') : t('cart_title')}</h2>
                    <button id="cart-close-btn" className="cart-icon-btn" onClick={closeCart} aria-label="Close"><X size={22} /></button>
                </header>

                {step === 'done' ? (
                    <div className="cart-done">
                        <div className="cart-done-icon">{WA_ICON}</div>
                        <h3>{t('order_done_title')}</h3>
                        <p>{t('order_done_text')}</p>
                        <button id="order-done-close" className="btn btn-primary" onClick={closeCart}>{t('order_done_cta')}</button>
                    </div>
                ) : lines.length === 0 ? (
                    <div className="cart-empty">
                        <div className="cart-empty-icon"><ShoppingBag size={42} /></div>
                        <p>{t('cart_empty')}</p>
                        <a href="#menu" className="btn btn-outline" onClick={closeCart}>{t('cart_browse')}</a>
                    </div>
                ) : (
                    <>
                        <div className="cart-body">
                            {/* Order type toggle (visible in both steps) */}
                            <div className="order-type-toggle" role="radiogroup">
                                {ORDER_SETTINGS.pickup.enabled && (
                                    <button id="order-type-pickup" role="radio" aria-checked={orderType === 'pickup'}
                                        className={orderType === 'pickup' ? 'active' : ''} onClick={() => setOrderType('pickup')}>
                                        <Store size={18} /> {t('order_pickup')}
                                    </button>
                                )}
                                {delivery.enabled && (
                                    <button id="order-type-delivery" role="radio" aria-checked={orderType === 'delivery'}
                                        className={orderType === 'delivery' ? 'active' : ''} onClick={() => setOrderType('delivery')}>
                                        <Bike size={18} /> {t('order_delivery')}
                                    </button>
                                )}
                                <span className={`toggle-thumb ${orderType}`}></span>
                            </div>

                            {step === 'cart' && (
                                <ul className="cart-lines">
                                    {lines.map(({ item, qty, lineTotal }) => (
                                        <li key={item.id} className="cart-line">
                                            <img src={item.image} alt="" className="cart-line-img" />
                                            <div className="cart-line-info">
                                                <span className="cart-line-name">{item.name[lang] || item.name.de}</span>
                                                {showPrices && <span className="cart-line-unit">{formatPrice(item.price, lang)}</span>}
                                                <div className="cart-line-stepper">
                                                    <button onClick={() => removeItem(item.id)} aria-label="-"><Minus size={14} /></button>
                                                    <span>{qty}</span>
                                                    <button onClick={() => addItem(item.id)} aria-label="+"><Plus size={14} /></button>
                                                </div>
                                            </div>
                                            <div className="cart-line-right">
                                                {showPrices && <span className="cart-line-total">{formatPrice(lineTotal, lang)}</span>}
                                                <button className="cart-line-delete" onClick={() => deleteItem(item.id)} aria-label={t('cart_remove')}><Trash2 size={16} /></button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {step === 'checkout' && (
                                <form id="checkout-form" className="checkout-form" onSubmit={submitOrder} noValidate>
                                    <div className={`co-field ${errors.name ? 'error' : ''}`}>
                                        <label htmlFor="co-name">{t('co_name')} *</label>
                                        <input id="co-name" type="text" autoComplete="name" value={form.name} onChange={update('name')} placeholder={t('co_name_ph')} />
                                    </div>
                                    <div className={`co-field ${errors.phone ? 'error' : ''}`}>
                                        <label htmlFor="co-phone">{t('co_phone')} *</label>
                                        <input id="co-phone" type="tel" autoComplete="tel" value={form.phone} onChange={update('phone')} placeholder="+49 170 1234567" />
                                    </div>

                                    {orderType === 'delivery' && (
                                        <div className="co-row">
                                            <div className={`co-field grow ${errors.street ? 'error' : ''}`}>
                                                <label htmlFor="co-street">{t('co_street')} *</label>
                                                <input id="co-street" type="text" autoComplete="street-address" value={form.street} onChange={update('street')} placeholder={t('co_street_ph')} />
                                            </div>
                                            <div className={`co-field zip ${errors.zip ? 'error' : ''}`}>
                                                <label htmlFor="co-zip">{t('co_zip')} *</label>
                                                <input id="co-zip" type="text" inputMode="numeric" autoComplete="postal-code" maxLength={5} value={form.zip} onChange={update('zip')} placeholder="10627" />
                                            </div>
                                        </div>
                                    )}

                                    <div className="co-field">
                                        <label>{orderType === 'delivery' ? t('co_time_delivery') : t('co_time_pickup')}</label>
                                        <div className="co-chips">
                                            <button type="button" id="co-time-asap" className={form.time === 'asap' ? 'active' : ''} onClick={() => setForm(f => ({ ...f, time: 'asap' }))}>{t('co_asap')}</button>
                                            <button type="button" id="co-time-later" className={form.time === 'later' ? 'active' : ''} onClick={() => setForm(f => ({ ...f, time: 'later' }))}>{t('co_later')}</button>
                                            {form.time === 'later' && (
                                                <input id="co-time-value" type="time" className={errors.timeValue ? 'error' : ''} value={form.timeValue} onChange={update('timeValue')} />
                                            )}
                                        </div>
                                    </div>

                                    <div className="co-field">
                                        <label>{t('co_payment')}</label>
                                        <div className="co-chips">
                                            <button type="button" id="co-pay-cash" className={form.payment === 'cash' ? 'active' : ''} onClick={() => setForm(f => ({ ...f, payment: 'cash' }))}>{t('co_cash')}</button>
                                            <button type="button" id="co-pay-card" className={form.payment === 'card' ? 'active' : ''} onClick={() => setForm(f => ({ ...f, payment: 'card' }))}>{t('co_card')}</button>
                                        </div>
                                    </div>

                                    <div className="co-field">
                                        <label htmlFor="co-notes">{t('co_notes')}</label>
                                        <textarea id="co-notes" rows={2} value={form.notes} onChange={update('notes')} placeholder={t('co_notes_ph')} />
                                    </div>

                                    {orderType === 'pickup' && (
                                        <p className="co-hint"><Store size={14} /> {t('co_pickup_at')} {ORDER_SETTINGS.pickup.address}</p>
                                    )}
                                    {Object.keys(errors).some(k => errors[k]) && <p className="co-error-msg">{t('co_error')}</p>}
                                </form>
                            )}
                        </div>

                        <footer className="cart-footer">
                            {showPrices && (
                                <>
                                    <div className="cart-sum-row"><span>{t('cart_subtotal')}</span><span>{formatPrice(subtotal, lang)}</span></div>
                                    {orderType === 'delivery' && (
                                        <div className="cart-sum-row"><span>{t('cart_delivery_fee')}</span><span>{deliveryFee ? formatPrice(deliveryFee, lang) : t('cart_free')}</span></div>
                                    )}
                                    <div className="cart-sum-row total"><span>{t('cart_total')}</span><span>{formatPrice(total, lang)}</span></div>

                                    {belowMin && (
                                        <p className="cart-min-warning">
                                            {t('cart_min_order').replace('{min}', formatPrice(delivery.minOrder, lang)).replace('{diff}', formatPrice(minDiff, lang))}
                                        </p>
                                    )}
                                </>
                            )}

                            {step === 'cart' ? (
                                <button id="cart-checkout-btn" className="btn btn-primary w-full cart-cta" disabled={belowMin} onClick={() => setStep('checkout')}>
                                    {t('cart_checkout')} <ArrowRight size={18} />
                                </button>
                            ) : (
                                <button id="cart-submit-btn" type="submit" form="checkout-form" className="btn w-full cart-cta wa-cta" disabled={belowMin}>
                                    {WA_ICON} {t('co_submit')}
                                </button>
                            )}
                            {step === 'checkout' && <p className="cart-footnote">{t('co_footnote')}</p>}
                        </footer>
                    </>
                )}
            </aside>
        </>
    );
};

export default Cart;
