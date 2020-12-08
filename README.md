# Reiknirrit Lokaverkefni

## Guðmundur Brimir Björnsson

Ég ætla að reyna að búa til vefsíðu sem sýnir hegðun röðunaralgríma. 

Til að auðvelda grafísku hliðina á verkefninu ákvað ég að nota javascript og html.

Innblásturinn er tekinn úr þessu verkefni:
https://www.youtube.com/watch?v=kPRA0W1kECg&t=89s

Github pages:
https://gummy27.github.io/Reiknirrit_Lokaverkefni/

Youtube útskýringar:
https://youtu.be/jQUMsBs-fiI

### Dagbók

21. nóvember var github geymslan stofnuð. Aðeins voru nokkrar skrár sett upp.

22. nóvember var byrjað á að útfæra listann sem talvan á að raða.

23. nóvember var listinn full útfærður og byrjað var á insertion sort sem er einnig klárað.

24. nóvember insertion sort var forritað og sett inn í forritið. Byrjað var á quick sort.

25. nóvember var quick sort loks klárað og full útfært. 

26. nóvember var stoppa hegðuninn bætt við ásamt teljurum. 

27. nóvember var radix sort algrímið fullforritað. Nú er aðeins grafískir hlutir eftir.

28. Allir teljararnir (array access, comparisons og tími) eru fullkláraðir. Einnig bætti ég við takka til að breyta stærð súlanna og fjölda.

30. nóvember. Forritið er fullklárað og byrjað er á verklýsingunum og þannig.

### Flækjustig (Big O)
Flækjustig forritsins er að sjálfsögðu flækjustig röðunaralgrímana. Fyrir neðan ætla ég að taka fram flækjustig allra algrímanna sem ég nota.

|     Algrím     | Besta Tilvik |  Meðaltal  | Versta Tilvik |
|----------------|--------------|------------|---------------|
| Bubble Sort    |     O(n)     |    O(n^2)  |     O(n^2)    |
| Insertion sort |     O(n)     |    O(n^2)  |     O(n^2)    |
| Quick sort     |  O(n log(n)) | O(n log(n))|     O(n^2)    |
| Radix sort     |     O(nk)    |    O(nk)   |     O(nk)     |

Hin algrímin sem ég nota s.s. stokka er með flækjustig O(n) þar sem fallið fer í gegnum allan listann einu sinni.

### Lokaorð

Ég er mjög ánægður með útkomuna. Forritið er eiginlega alveg eins og ég ímyndaði mér það. Þetta var mjög skemmtilegt verkefni en að sjálfsögðu komu upp nokkrir
erfiðleikar. Javascript er augljóslega ekki hannað til að vera "backend" forritunarmál þar sem það hefur margar takmarkanir. Það var óvenju flókið að skipta 
tveimur súlum svo ég þurfti að gera heilt fall tileinkað því. Einnig var aðeins flóknara að forrita algríminn þar sem algrímið er ekki að raða hefðbundnan lista. Ég ætlaði að hafa merge sort með í þessu en það bara passaði ekki í forritið. En hins vegar er ég mjög ánægður með grafísku hliðina. Hún er mjög lík þessum myndböndum sem ég hef verið að horfa á. Ég þakka kærlega fyrir önnina. Þetta er án efa besti forritunar áfangi sem ég hef farið í. 
