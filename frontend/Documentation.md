# Textbook Generator Documentation


Visit [Mustache](https://mustache.github.io/), we'll be using this tool to create the template for every textbook layout.

 

### Document format
|     | *A*         |*B*          | *C*         | *D*          
| --- | ----------- | ----------- | ----------- | -----------
| *1* | Properties  | 0           | 1           | N ... 
| *2* | **key_1**   | value       |             |
| *3* | **key_2**   | item 1      | item 2      |
| *4* | ...         |             |             |
| **sheet_1** | sheet_2   | ...
<br>
>***Note:*** Property name must not contain space character. Properties starts at **row 2** and indexes starts at **column B**
---

### Structure of data extracted from Google Sheet

```json
[
    {
        "key_1": "value",
        "key_2": ["item 1", "item 2"]
        ...
    },
    {
        ...
    }
]
```
### Template Creation
```html
<div>
    <h1>{{ key_1 }}</h1>
    <ul>
        {{ #key_2 }}
            <li>{{ . }}</li>
        {{ /key_2 }}
    </ul>
</div>
```
***Code in generated file***
```html
<div>
    <h1>value</h1>
    <ul>
        <li>item 1</li>
        <li>item 2</li>
    </ul>
</div>
```