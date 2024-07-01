### lodash-es

1. toUpper & upperCase 的差異：

- toUpper 單純將整個字串轉換為大寫，不會進行其他處理，與 JavaScript 原生的 String.prototype.toUpperCase 方法相同。
- upperCase 不僅將字串轉換為大寫，還會將字串分割為單詞，並在單詞之間插入空格。這可能會導致包含特殊字符和重音符號的越南語字串時，可能會錯誤地分割字符，使結果不符合預期。
- 如果只需要將字串轉換為大寫，推薦使用 toUpper。
