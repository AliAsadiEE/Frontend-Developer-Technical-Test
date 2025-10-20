import React from 'react';

export default function GuidePage(){
  return (
    <main className="mx-auto max-w-3xl px-3 sm:px-6 py-6">
      <article className="prose prose-slate dark:prose-invert max-w-none">
        <h1>راهنمای استفاده از اکسچنج‌فا</h1>
        <p>این نسخه، نمونهٔ فرانت‌اند است و به صورت آزمایشی اجرا می‌شود. برای استفادهٔ عملیاتی باید به بک‌اند و درگاه‌های پرداخت متصل شود.</p>
        <h2>مراحل کلی خرید ارز دیجیتال</h2>
        <ol>
          <li>ثبت‌نام و ورود به حساب کاربری</li>
          <li>تکمیل احراز هویت (KYC) برای افزایش سقف‌ها</li>
          <li>واریز ریالی یا انتقال داخلی</li>
          <li>ثبت سفارش مارکت یا لیمیت</li>
        </ol>
        <h2>سوالات پرتکرار</h2>
        <p><strong>آیا برداشت به کیف پول خارجی فعال است؟</strong> خیر، طبق درخواست شما فعلاً غیرفعال است.</p>
        <p><strong>قیمت‌ها از کجا می‌آید؟</strong> در این نسخه ماک هستند اما می‌توان آن را به WebSocket قیمت‌های لحظه‌ای متصل کرد.</p>
      </article>
    </main>
  )
}
