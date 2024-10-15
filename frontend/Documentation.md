# Textbook Generator Documentation


Visit [Handlebars](https://handlebarsjs.com/), we'll be using this tool to create the template for every textbook layout.

 

### Document format
|     | *A*                                |*B*                                                                                                          | *C*                | *D*                  | *E*
| --- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------ | -------------------- | -----------
| *1* | Properties                         | 0                                                                                                           | 1                  | 2                    | N...
| *2* | **title**                          | IELTS Speaking \| Part                                                                                     |                    |                     |
| *3* | **title_jp**                       | IELTSスピーキング対策 \| パート                                                                                                          |                    |                     |
| *2* | **heading**                        | Lesson                                                                                                     |                    |                     |
| *3* | **heading_jp**                     | レッスン                                                                                                   |                    |                     |
| *2* | **revision_card_desc**             | Describe a book you have recently read.                                                                     |                    |                     |
| *3* | **revision_card_desc_jp**          | 最近読んだ本について説明してください。                                                                         |                    |                     |
| *2* | **revision_card_say_list**         | The name of the book                                                                                       | What ist was about | When you read it    |
| *3* | **revision_card_say_list_jp**      | 本の名前                                                                                                    | どんな内容だったか   | いつ読んだか         |
| *2* | **revision_card_say_explain**      | And explain how you liked it.                                                                              |                      |                   |
| *3* | **revision_card_say_explain_jp**   | そして、その本がどのように良かったかを説明してください。                                                        |                     |                      |
| *2* | **question_1**                     | Do many people go to the library in your country?                                                          |                      |                   |
| *3* | **question_1_jp**                  | あなたの国では多くの人が図書館に行きますか？                                                                   |                      |                   |
| *2* | **question_2**                     | In your opinion, what are some advantages and disadvantages of reading books on electronic devices?        |                      |                   |
| *3* | **question_2_jp**                  | 電子機器で本を読むことのメリットとデメリットは何だと思いますか？                                                  |                      |                    |
| *4* | ...

| **sheet_1** | sheet_2   | ...

<br>


> ***Note***: Property name must not contain space character. Properties starts at **row 2** and indexes starts at **column B**

---

### Structure of data extracted from Google Sheet

```json
[
    {
      "index": 1,
      "title": {
        "eng": "IELTS Speaking | Part 3",
        "jp": ""
      },
      "heading": {
        "eng": "Lesson 1",
        "jp": ""
      },
      "revision_card_desc": {
        "eng": "Describe a book you have recently read.",
        "jp": "最近読んだ本について説明してください。"
      },
      "revision_card_say_list": [
        {
          "eng": "The name of the book",
          "jp": "本の名前"
        },
        {
          "eng": "What ist was about",
          "jp": "どんな内容だったか"
        },
        {
          "eng": "When you read it",
          "jp": "いつ読んだか"
        }
      ],
      "revision_card_say_explain": {
        "eng": "And explain how you liked it.",
        "jp": "そして、その本がどのように良かったかを説明してください。"
      },
      "question_1": {
        "eng": "Do many people go to the library in your country?",
        "jp": "あなたの国では多くの人が図書館に行きますか？"
      },
      "question_2": {
        "eng": "In your opinion, what are some advantages and disadvantages of reading books on electronic devices?",
        "jp": "電子機器で本を読むことのメリットとデメリットは何だと思いますか？"
      }
    },
    {
        ...
    }
]
```

 ```html
 {{#items}}
   {{ this.eng }}
   {{ this.jp }}
 {{/items}}
 ```

 ## Helpers
 blank

<!-- ### Template Creation
```html
<div>
    <h1>{{ key_1 }}</h1>
    <ul>
        {{ #key_2 }}
            <li>{{ key }} - {{ value }}</li>
        {{ /key_2 }}
    </ul>
</div>
```
***Code in generated file***
```html
<div>
    <h1>value</h1>
    <ul>
        <li>1 - item 1</li>
        <li>2 - item 2</li>
    </ul>
</div>
``` -->

> ***Tip***: Create a static html with its dedicated content, structure the a document for templating and convert the static html to (mustached) template

<!-- [PanthomJS](https://phantomjs.org/screen-capture.html) -->