# Домашняя работа по теме Новые возможности JS

Ниже преведена документация для функции которая выполняет последовательные запросы
и позволяет получить результаты предыдущих запросов.

Сборки библиотеки для ES5 среды:

```
npm install
npm build
```

Для демонстрации работы нужно:
1. Собрать библиотеку
2. Открыть файл в index.html в браузере

## Functions

<dl>
<dt><a href="#fetchSequence">fetchSequence(url, [resolve], [reject], [fetch])</a> ⇒ <code>Object</code></dt>
<dd><p>Функция делает последовательные запросы используя Fetch API</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#resolveCallback">resolveCallback</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#rejectCallback">rejectCallback</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#fetch">fetch</a> ⇒ <code>Promise</code></dt>
<dd></dd>
</dl>

<a name="fetchSequence"></a>

## fetchSequence(url, [resolve], [reject], [fetch]) ⇒ <code>Object</code>
Функция делает последовательные запросы используя Fetch API

**Kind**: global function  

| Param | Type |
| --- | --- |
| url | <code>string</code> \| <code>Request</code> | 
| [resolve] | [<code>resolveCallback</code>](#resolveCallback) | 
| [reject] | [<code>rejectCallback</code>](#rejectCallback) | 
| [fetch] | [<code>fetch</code>](#fetch) | 

<a name="resolveCallback"></a>

## resolveCallback ⇒ <code>void</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| response | <code>Response</code> | 
| responses | <code>Array.&lt;Response&gt;</code> | 

<a name="rejectCallback"></a>

## rejectCallback ⇒ <code>void</code>
**Kind**: global typedef  
<a name="fetch"></a>

## fetch ⇒ <code>Promise</code>
**Kind**: global typedef  
**See**: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API  

| Type |
| --- |
| <code>string</code> \| <code>Request</code> | 

