import { useState, useEffect } from "react";

/* ================= 内蔵データ ================= */
/* level: E=Lv.1入門 / D=Lv.2初級 / C=Lv.3中級 / B=Lv.4中上級（内部キー） */

const VOCAB = [
  { ind: "makan", jp: "食べる", level: "E" },
  { ind: "minum", jp: "飲む", level: "E" },
  { ind: "pergi", jp: "行く", level: "E" },
  { ind: "datang", jp: "来る", level: "E" },
  { ind: "tidur", jp: "寝る", level: "E" },
  { ind: "buku", jp: "本", level: "E" },
  { ind: "rumah", jp: "家", level: "E" },
  { ind: "air", jp: "水", level: "E" },
  { ind: "nasi", jp: "ご飯", level: "E" },
  { ind: "ikan", jp: "魚", level: "E" },
  { ind: "besar", jp: "大きい", level: "E" },
  { ind: "kecil", jp: "小さい", level: "E" },
  { ind: "baik", jp: "良い", level: "E" },
  { ind: "orang", jp: "人", level: "E" },
  { ind: "sekolah", jp: "学校", level: "E" },
  { ind: "teman", jp: "友達", level: "E" },
  { ind: "murah", jp: "（値段が）安い", level: "E" },
  { ind: "mahal", jp: "（値段が）高い", level: "E" },
  { ind: "panas", jp: "暑い・熱い", level: "E" },
  { ind: "dingin", jp: "寒い・冷たい", level: "E" },
  { ind: "pagi", jp: "朝", level: "E" },
  { ind: "malam", jp: "夜", level: "E" },
  { ind: "enak", jp: "おいしい", level: "E" },
  { ind: "hari", jp: "日", level: "E" },
  { ind: "bekerja", jp: "働く", level: "D" },
  { ind: "belajar", jp: "勉強する", level: "D" },
  { ind: "membeli", jp: "買う", level: "D" },
  { ind: "menjual", jp: "売る", level: "D" },
  { ind: "berangkat", jp: "出発する", level: "D" },
  { ind: "pulang", jp: "帰る", level: "D" },
  { ind: "kemarin", jp: "昨日", level: "D" },
  { ind: "besok", jp: "明日", level: "D" },
  { ind: "sekarang", jp: "今", level: "D" },
  { ind: "mudah", jp: "簡単な", level: "D" },
  { ind: "sulit", jp: "難しい", level: "D" },
  { ind: "penting", jp: "重要な", level: "D" },
  { ind: "kantor", jp: "オフィス・事務所", level: "D" },
  { ind: "pasar", jp: "市場", level: "D" },
  { ind: "uang", jp: "お金", level: "D" },
  { ind: "waktu", jp: "時間", level: "D" },
  { ind: "bahasa", jp: "言語・言葉", level: "D" },
  { ind: "negara", jp: "国", level: "D" },
  { ind: "cuaca", jp: "天気", level: "D" },
  { ind: "sering", jp: "よく・しばしば", level: "D" },
  { ind: "pemerintah", jp: "政府", level: "C" },
  { ind: "ekonomi", jp: "経済", level: "C" },
  { ind: "masyarakat", jp: "社会・人々", level: "C" },
  { ind: "lingkungan", jp: "環境", level: "C" },
  { ind: "pendidikan", jp: "教育", level: "C" },
  { ind: "kesehatan", jp: "健康", level: "C" },
  { ind: "pengalaman", jp: "経験", level: "C" },
  { ind: "keputusan", jp: "決定", level: "C" },
  { ind: "mengembangkan", jp: "発展させる", level: "C" },
  { ind: "meningkat", jp: "増加する・向上する", level: "C" },
  { ind: "menurun", jp: "減少する・低下する", level: "C" },
  { ind: "terjadi", jp: "起こる・発生する", level: "C" },
  { ind: "menyebabkan", jp: "引き起こす", level: "C" },
  { ind: "kesempatan", jp: "機会・チャンス", level: "C" },
  { ind: "perusahaan", jp: "会社・企業", level: "C" },
  { ind: "penduduk", jp: "住民・人口", level: "C" },
  { ind: "kebijakan", jp: "政策", level: "B" },
  { ind: "pertumbuhan", jp: "成長", level: "B" },
  { ind: "kesejahteraan", jp: "福祉・繁栄", level: "B" },
  { ind: "berkelanjutan", jp: "持続可能な", level: "B" },
  { ind: "ketimpangan", jp: "格差・不均衡", level: "B" },
  { ind: "investasi", jp: "投資", level: "B" },
  { ind: "infrastruktur", jp: "インフラ", level: "B" },
  { ind: "persaingan", jp: "競争", level: "B" },
  { ind: "sumber daya", jp: "資源", level: "B" },
  { ind: "tenaga kerja", jp: "労働力", level: "B" },
  { ind: "dampak", jp: "影響", level: "B" },
  { ind: "upaya", jp: "努力・取り組み", level: "B" },
];

const PHRASES = [
  { ind: "terima kasih", jp: "ありがとう", level: "E" },
  { ind: "selamat pagi", jp: "おはよう", level: "E" },
  { ind: "apa kabar?", jp: "元気ですか？", level: "E" },
  { ind: "sama-sama", jp: "どういたしまして", level: "E" },
  { ind: "permisi", jp: "すみません（呼びかけ）", level: "E" },
  { ind: "tidak apa-apa", jp: "大丈夫・何でもないよ", level: "E" },
  { ind: "minta maaf", jp: "ごめんなさい", level: "D" },
  { ind: "hati-hati", jp: "気をつけて", level: "D" },
  { ind: "jalan-jalan", jp: "散歩する・遊びに行く", level: "D" },
  { ind: "oleh-oleh", jp: "お土産", level: "D" },
  { ind: "masuk angin", jp: "風邪をひく・体調を崩す", level: "D" },
  { ind: "besar kepala", jp: "うぬぼれる（頭が大きい→）", level: "C" },
  { ind: "panjang tangan", jp: "手癖が悪い（手が長い→）", level: "C" },
  { ind: "buah tangan", jp: "お土産（手の果実→）", level: "C" },
  { ind: "angkat tangan", jp: "お手上げ・降参する", level: "C" },
  { ind: "naik daun", jp: "人気が出る（葉に登る→）", level: "B" },
  { ind: "kambing hitam", jp: "スケープゴート・身代わり（黒ヤギ→）", level: "B" },
  { ind: "meja hijau", jp: "法廷（緑の机→）", level: "B" },
  { ind: "tangan kanan", jp: "右腕・腹心の部下", level: "B" },
];

const GRAMMAR = [
  { level: "E", q: "Dia ___ guru.", hint: "彼は先生ではありません", choices: ["tidak", "bukan", "belum", "jangan"], answer: "bukan", exp: "名詞を否定するときは bukan。動詞・形容詞の否定は tidak を使います。" },
  { level: "E", q: "Saya tinggal ___ Jakarta.", hint: "私はジャカルタに住んでいます", choices: ["di", "ke", "dari", "pada"], answer: "di", exp: "場所「〜に・〜で」は di。ke は「〜へ」、dari は「〜から」。" },
  { level: "E", q: "Kamu mau pergi ___ mana?", hint: "どこへ行きたいの？", choices: ["di", "ke", "dari", "dengan"], answer: "ke", exp: "移動の方向「〜へ」は ke。ke mana で「どこへ」。" },
  { level: "E", q: "___ nama Anda?", hint: "お名前は何ですか？", choices: ["Apa", "Siapa", "Kapan", "Berapa"], answer: "Siapa", exp: "インドネシア語では名前を聞くとき siapa（誰）を使います。Apa は使いません。" },
  { level: "E", q: "Saya ___ berbahasa Indonesia sedikit.", hint: "少しインドネシア語が話せます", choices: ["bisa", "harus", "jangan", "sudah"], answer: "bisa", exp: "bisa =「できる」。harus =「〜しなければならない」。" },
  { level: "E", q: "Ini ___.", hint: "これは私の本です", choices: ["buku saya", "saya buku", "buku di saya", "saya punya di buku"], answer: "buku saya", exp: "所有は「名詞＋所有者」の語順。buku saya =「私の本」。" },
  { level: "E", q: "Saya makan ___ teman.", hint: "友達と一緒に食べます", choices: ["dengan", "untuk", "kepada", "oleh"], answer: "dengan", exp: "dengan =「〜と一緒に」。untuk =「〜のために」。" },
  { level: "E", q: "___ merokok di sini!", hint: "ここでタバコを吸わないで！", choices: ["Tidak", "Bukan", "Jangan", "Belum"], answer: "Jangan", exp: "禁止「〜するな」は jangan。tidak は単なる否定です。" },
  { level: "D", q: "Saya ___ makan siang.", hint: "もう昼ご飯を食べました", choices: ["sudah", "sedang", "akan", "masih"], answer: "sudah", exp: "sudah = 完了「もう〜した」。sedang = 進行中、akan = 未来。" },
  { level: "D", q: "Dia ___ belajar di kamar.", hint: "彼は部屋で勉強しているところです", choices: ["sudah", "sedang", "akan", "belum"], answer: "sedang", exp: "sedang = 進行「〜しているところ」。" },
  { level: "D", q: "Kami ___ pergi ke Bali bulan depan.", hint: "来月バリへ行く予定です", choices: ["sudah", "sedang", "akan", "pernah"], answer: "akan", exp: "akan = 未来「〜するつもり・〜する予定」。" },
  { level: "D", q: "Buku ___ saya beli kemarin sangat menarik.", hint: "昨日買った本はとても面白いです", choices: ["yang", "itu", "ini", "apa"], answer: "yang", exp: "yang は関係詞のような働きで、後ろから名詞を説明します。" },
  { level: "D", q: "Kakak saya suka ___.", hint: "兄（姉）は自転車に乗るのが好きです", choices: ["sepeda", "bersepeda", "menyepeda", "disepeda"], answer: "bersepeda", exp: "接頭辞 ber- は「〜を使う・〜をする」という自動詞を作ります。" },
  { level: "D", q: "Gunung Fuji ___ tinggi daripada Gunung Merapi.", hint: "富士山はムラピ山より高いです", choices: ["paling", "lebih", "sangat", "sekali"], answer: "lebih", exp: "比較は lebih 〜 daripada …「…より〜」。最上級は paling。" },
  { level: "D", q: "Saya belajar bahasa Indonesia ___ dua tahun.", hint: "2年間インドネシア語を勉強しています", choices: ["selama", "sejak", "sampai", "sebelum"], answer: "selama", exp: "selama =「〜の間」。sejak =「〜以来」、sampai =「〜まで」。" },
  { level: "D", q: "Saya belum ___ pergi ke Indonesia.", hint: "まだインドネシアへ行ったことがありません", choices: ["pernah", "sudah", "sedang", "akan"], answer: "pernah", exp: "pernah = 経験「〜したことがある」。belum pernah =「まだ〜したことがない」。" },
  { level: "C", q: "Surat itu ___ oleh ayah saya.", hint: "その手紙は父によって書かれました", choices: ["menulis", "ditulis", "tertulis", "penulis"], answer: "ditulis", exp: "受動態は接頭辞 di-。ditulis oleh 〜 =「〜によって書かれる」。" },
  { level: "C", q: "Pemerintah ___ jembatan baru di desa itu.", hint: "政府はその村に新しい橋を建設します", choices: ["bangun", "membangun", "dibangun", "pembangunan"], answer: "membangun", exp: "接頭辞 me- で他動詞に。pembangunan は名詞「建設・開発」。" },
  { level: "C", q: "Harga barang ___ naik karena inflasi.", hint: "物価はインフレでますます上がっています", choices: ["semakin", "sangat", "paling", "agak"], answer: "semakin", exp: "semakin =「ますます〜」。変化の強まりを表します。" },
  { level: "C", q: "Dia tetap bekerja ___ sedang sakit.", hint: "彼は病気なのに働き続けました", choices: ["karena", "meskipun", "supaya", "sehingga"], answer: "meskipun", exp: "meskipun / walaupun =「〜にもかかわらず」。karena =「〜なので」。" },
  { level: "C", q: "___ belajar, dia juga bekerja paruh waktu.", hint: "勉強だけでなく、アルバイトもしています", choices: ["Selain", "Kecuali", "Tanpa", "Antara"], answer: "Selain", exp: "selain =「〜のほかに・〜だけでなく」。" },
  { level: "C", q: "Masalah ___ akan dibahas dalam rapat besok.", hint: "その（前述の）問題は明日の会議で話し合われます", choices: ["tersebut", "terjadi", "termasuk", "ternyata"], answer: "tersebut", exp: "tersebut =「前述の・その」。文章語でよく使われます。" },
  { level: "C", q: "Dia belajar keras ___ lulus ujian.", hint: "試験に合格するために一生懸命勉強します", choices: ["supaya", "walaupun", "padahal", "sebelum"], answer: "supaya", exp: "supaya / agar =「〜するために」。目的を表します。" },
  { level: "C", q: "___ hujan deras, pertandingan tetap dilanjutkan.", hint: "大雨にもかかわらず、試合は続行されました", choices: ["Walaupun", "Karena", "Jika", "Setelah"], answer: "Walaupun", exp: "walaupun =「〜にもかかわらず」。tetap（それでも）とセットで頻出。" },
  { level: "B", q: "___ para ahli, ekonomi akan membaik tahun depan.", hint: "専門家によると、来年経済は良くなるでしょう", choices: ["Menurut", "Terhadap", "Mengenai", "Sekitar"], answer: "Menurut", exp: "menurut =「〜によると」。意見や情報源を示す前置詞。" },
  { level: "B", q: "Pemerintah berupaya ___ kesenjangan sosial.", hint: "政府は社会格差を縮小しようと努めています", choices: ["mengurangi", "berkurang", "kekurangan", "pengurangan"], answer: "mengurangi", exp: "mengurangi =「減らす」（他動詞）。berkurang =「減る」、kekurangan =「不足」。" },
  { level: "B", q: "Masalah lingkungan harus ___ secara serius.", hint: "環境問題は真剣に対処されるべきです", choices: ["menangani", "ditangani", "tertangani", "penanganan"], answer: "ditangani", exp: "harus + 受動態 di- で「〜されるべき」。" },
  { level: "B", q: "Kebijakan baru itu ___ dampak positif terhadap perekonomian.", hint: "新政策は経済に良い影響をもたらしました", choices: ["menimbulkan", "timbul", "ketimbulan", "tertimbul"], answer: "menimbulkan", exp: "menimbulkan =「（結果・影響を）生じさせる」。timbul =「生じる」（自動詞）。" },
  { level: "B", q: "Proyek itu dilaksanakan ___ dengan rencana awal.", hint: "その事業は当初の計画どおりに実施されました", choices: ["sesuai", "seperti", "sebagai", "selama"], answer: "sesuai", exp: "sesuai dengan =「〜に従って・〜のとおりに」。" },
  { level: "B", q: "___ pandemi, banyak perusahaan mengalami kerugian besar.", hint: "パンデミックの結果、多くの企業が大きな損失を被りました", choices: ["Akibat", "Supaya", "Agar", "Seandainya"], answer: "Akibat", exp: "akibat =「〜の結果として」。" },
];

/* 語根と接辞（me-, ber-, pe-, -an, ke-an, pe-an, ter-, me-kan, memper-） */
const AFFIX = [
  { level: "E", q: "語根 main（遊び）→「遊ぶ」は？", hint: "スポーツをする、にも使うよ", choices: ["bermain", "memainkan", "pemain", "mainan"], answer: "bermain", exp: "ber- で自動詞に。bermain =「遊ぶ・プレーする」。pemain =「選手」、mainan =「おもちゃ」。" },
  { level: "E", q: "語根 nama（名前）→「〜という名前である」は？", hint: "Saya ___ Tanaka. のように使う", choices: ["nama", "bernama", "menamai", "penamaan"], answer: "bernama", exp: "ber-＋名詞 =「〜を持つ」。bernama =「〜という名前を持つ」。" },
  { level: "D", q: "語根 ajar（教え）→「勉強する」は？", hint: "ber- 系の変化だよ", choices: ["belajar", "mengajar", "pelajar", "pelajaran"], answer: "belajar", exp: "belajar =「勉強する」（ber- の変化形）。mengajar =「教える」、pelajar =「生徒」、pelajaran =「授業・科目」。語根 ajar の変化はテスト頻出！" },
  { level: "D", q: "語根 kerja（仕事）→「働く」は？", hint: "自動詞になる接頭辞", choices: ["bekerja", "pekerja", "pekerjaan", "mengerjakan"], answer: "bekerja", exp: "bekerja =「働く」。pekerja =「労働者」、pekerjaan =「仕事・職業」、mengerjakan =「（課題などを）やる」。" },
  { level: "D", q: "mengajar の意味は？", hint: "語根は ajar（教え）", choices: ["勉強する", "教える", "生徒", "授業"], answer: "教える", exp: "me- は「〜する」（多くは他動詞）。mengajar =「教える」、belajar =「勉強する」。" },
  { level: "D", q: "語根 bahasa（言語）→「（言語を）話す・使う」は？", hint: "Saya ___ Indonesia.", choices: ["berbahasa", "membahasakan", "kebahasaan", "pembahasa"], answer: "berbahasa", exp: "ber-＋名詞 =「〜を使う・持つ」。berbahasa Indonesia =「インドネシア語を話す」。" },
  { level: "C", q: "語根 baca（読み）→「読む」（他動詞）は？", hint: "me- の鼻音化に注意", choices: ["membaca", "pembaca", "bacaan", "terbaca"], answer: "membaca", exp: "b で始まる語根は mem- に。membaca =「読む」、pembaca =「読者」、bacaan =「読み物」。" },
  { level: "C", q: "語根 tulis（書き）→「作家・書く人」は？", hint: "「〜する人」を作る接頭辞", choices: ["menulis", "penulis", "tulisan", "ditulis"], answer: "penulis", exp: "pe-＋語根 =「〜する人」。penulis =「作家」、menulis =「書く」、tulisan =「文章」。" },
  { level: "C", q: "語根 bangun（建つ・起きる）→「建物」は？", hint: "「〜した結果・物」を作る接尾辞", choices: ["membangun", "bangunan", "pembangun", "terbangun"], answer: "bangunan", exp: "-an =「〜の結果・物」。bangunan =「建物」、membangun =「建てる」、pembangunan =「建設・開発」。" },
  { level: "C", q: "語根 didik（教育する）→「教育」（名詞）は？", hint: "「行為・過程」の名詞を作る形", choices: ["mendidik", "pendidik", "pendidikan", "terdidik"], answer: "pendidikan", exp: "pe-＋語根＋-an =「〜すること（行為・過程）」。pendidikan =「教育」、pendidik =「教育者」。" },
  { level: "B", q: "語根 sehat（健康な）→「健康」（名詞）は？", hint: "形容詞を名詞にする形", choices: ["menyehatkan", "kesehatan", "penyehat", "tersehat"], answer: "kesehatan", exp: "ke-＋語根＋-an = 性質の名詞化。kesehatan =「健康」、keindahan =「美しさ」など。" },
  { level: "B", q: "語根 tingkat（段階・レベル）→「向上させる・高める」は？", hint: "「〜させる」他動詞を作る形", choices: ["meningkat", "meningkatkan", "peningkatan", "tingkatan"], answer: "meningkatkan", exp: "me-＋語根＋-kan =「〜させる」。meningkatkan =「向上させる」、meningkat =「向上する」、peningkatan =「向上（名詞）」。" },
  { level: "B", q: "terbawa の意味は？", hint: "接頭辞 ter- のはたらき", choices: ["持って行く", "うっかり持ってきてしまった", "運ぶ人", "荷物"], answer: "うっかり持ってきてしまった", exp: "ter- は「非意図・偶然」「〜された状態」「可能」を表します。terbawa =「うっかり持ってきてしまう」。" },
  { level: "B", q: "語根 besar（大きい）→「さらに大きくする・拡大する」は？", hint: "memper- のはたらき", choices: ["membesar", "memperbesar", "pembesaran", "terbesar"], answer: "memperbesar", exp: "memper- =「いっそう〜にする」。memperbesar =「拡大する」、terbesar =「最大の」。" },
];

/* 文の翻訳（イ⇔日） */
const SENTENCES = [
  { level: "E", ind: "Saya makan nasi goreng.", jp: "私はナシゴレンを食べます。" },
  { level: "E", ind: "Dia pergi ke sekolah setiap hari.", jp: "彼は毎日学校へ行きます。" },
  { level: "E", ind: "Rumah saya kecil tapi bersih.", jp: "私の家は小さいけれどきれいです。" },
  { level: "E", ind: "Ini teman saya dari Jepang.", jp: "こちらは日本から来た私の友達です。" },
  { level: "D", ind: "Saya sudah membeli tiket kemarin.", jp: "私は昨日チケットを買いました。" },
  { level: "D", ind: "Besok kami akan berangkat ke Bali.", jp: "明日私たちはバリへ出発します。" },
  { level: "D", ind: "Cuaca hari ini sangat panas.", jp: "今日の天気はとても暑いです。" },
  { level: "D", ind: "Dia sedang belajar bahasa Jepang di kamar.", jp: "彼は部屋で日本語を勉強しているところです。" },
  { level: "C", ind: "Jumlah penduduk kota ini terus meningkat.", jp: "この町の人口は増え続けています。" },
  { level: "C", ind: "Perusahaan itu memberikan kesempatan kepada karyawan muda.", jp: "その会社は若い社員にチャンスを与えています。" },
  { level: "C", ind: "Masalah lingkungan menjadi topik penting di masyarakat.", jp: "環境問題は社会で重要なテーマになっています。" },
  { level: "B", ind: "Pemerintah berupaya mengurangi ketimpangan ekonomi antara kota dan desa.", jp: "政府は都市と農村の経済格差を縮小しようと努めています。" },
  { level: "B", ind: "Investasi di bidang pendidikan sangat penting untuk pembangunan berkelanjutan.", jp: "教育分野への投資は持続可能な発展のためにとても重要です。" },
  { level: "B", ind: "Kebijakan baru itu menimbulkan dampak besar terhadap dunia usaha.", jp: "その新政策はビジネス界に大きな影響を与えました。" },
];

/* 並べ替え（chunksが正しい順） */
const ORDERS = [
  { level: "E", jp: "私は市場へ行きます", chunks: ["Saya", "pergi", "ke", "pasar"] },
  { level: "E", jp: "これはおいしい食べ物です", chunks: ["Ini", "makanan", "yang", "enak"] },
  { level: "E", jp: "私の友達は日本に住んでいます", chunks: ["Teman saya", "tinggal", "di", "Jepang"] },
  { level: "D", jp: "私は昨日お店で本を買いました", chunks: ["Saya", "membeli buku", "kemarin", "di toko"] },
  { level: "D", jp: "私たちは来月バリへ行く予定です", chunks: ["Kami", "akan pergi", "ke Bali", "bulan depan"] },
  { level: "D", jp: "私が昨日買った本はとても面白いです", chunks: ["Buku", "yang saya beli", "kemarin", "sangat menarik"] },
  { level: "C", jp: "この町の人口は毎年増えています", chunks: ["Jumlah penduduk", "kota ini", "meningkat", "setiap tahun"] },
  { level: "C", jp: "彼は病気にもかかわらず働き続けました", chunks: ["Dia tetap", "bekerja", "meskipun", "sedang sakit"] },
  { level: "B", jp: "政府は社会格差を減らそうと努めています", chunks: ["Pemerintah", "berupaya", "mengurangi", "kesenjangan sosial"] },
  { level: "B", jp: "その政策は経済に大きな影響を与えました", chunks: ["Kebijakan itu", "menimbulkan", "dampak besar", "terhadap ekonomi"] },
];

/* 仲間はずれ用カテゴリ */
const ODD_CATS = [
  { name: "食べ物", level: "E", words: [{ w: "nasi", m: "ご飯" }, { w: "roti", m: "パン" }, { w: "daging", m: "肉" }, { w: "sayur", m: "野菜" }, { w: "buah", m: "果物" }] },
  { name: "飲み物", level: "E", words: [{ w: "air", m: "水" }, { w: "teh", m: "お茶" }, { w: "kopi", m: "コーヒー" }, { w: "susu", m: "ミルク" }, { w: "jus", m: "ジュース" }] },
  { name: "動物", level: "E", words: [{ w: "kucing", m: "猫" }, { w: "anjing", m: "犬" }, { w: "burung", m: "鳥" }, { w: "ayam", m: "鶏" }, { w: "gajah", m: "象" }] },
  { name: "家族", level: "E", words: [{ w: "ayah", m: "父" }, { w: "ibu", m: "母" }, { w: "kakak", m: "兄・姉" }, { w: "adik", m: "弟・妹" }, { w: "nenek", m: "祖母" }] },
  { name: "色", level: "D", words: [{ w: "merah", m: "赤" }, { w: "putih", m: "白" }, { w: "hitam", m: "黒" }, { w: "biru", m: "青" }, { w: "kuning", m: "黄" }] },
  { name: "乗り物", level: "D", words: [{ w: "mobil", m: "車" }, { w: "bus", m: "バス" }, { w: "kereta", m: "電車" }, { w: "sepeda", m: "自転車" }, { w: "pesawat", m: "飛行機" }] },
  { name: "服・身につける物", level: "D", words: [{ w: "baju", m: "服" }, { w: "celana", m: "ズボン" }, { w: "sepatu", m: "靴" }, { w: "topi", m: "帽子" }, { w: "kacamata", m: "眼鏡" }] },
  { name: "方角・位置", level: "D", words: [{ w: "utara", m: "北" }, { w: "selatan", m: "南" }, { w: "timur", m: "東" }, { w: "barat", m: "西" }, { w: "atas", m: "上" }] },
  { name: "職業", level: "C", words: [{ w: "guru", m: "教師" }, { w: "dokter", m: "医者" }, { w: "petani", m: "農家" }, { w: "polisi", m: "警察官" }, { w: "pedagang", m: "商人" }] },
  { name: "天気・自然", level: "C", words: [{ w: "hujan", m: "雨" }, { w: "angin", m: "風" }, { w: "awan", m: "雲" }, { w: "salju", m: "雪" }, { w: "matahari", m: "太陽" }] },
  { name: "経済のことば", level: "B", words: [{ w: "investasi", m: "投資" }, { w: "pajak", m: "税金" }, { w: "inflasi", m: "インフレ" }, { w: "ekspor", m: "輸出" }] },
  { name: "政治・行政のことば", level: "B", words: [{ w: "pemerintah", m: "政府" }, { w: "kebijakan", m: "政策" }, { w: "pemilu", m: "選挙" }, { w: "undang-undang", m: "法律" }] },
];

const READING = [
  { level: "E", passage: "Nama saya Sari. Saya tinggal di Jakarta bersama keluarga. Setiap pagi saya pergi ke kantor naik bus.", q: "サリさんは毎朝どうやって会社へ行きますか？", choices: ["電車で", "バスで", "車で", "歩いて"], answer: "バスで", exp: "naik bus =「バスに乗って」。naik +乗り物 で移動手段を表します。" },
  { level: "D", passage: "Besok teman saya datang dari Jepang. Kami akan pergi ke Bali selama tiga hari. Saya sudah membeli tiket pesawat minggu lalu.", q: "二人はバリに何日間行く予定ですか？", choices: ["1日", "3日間", "1週間", "3週間"], answer: "3日間", exp: "selama tiga hari =「3日間」。tiket pesawat は「航空券」。" },
  { level: "C", passage: "Jumlah wisatawan asing yang berkunjung ke Indonesia meningkat tajam tahun ini. Pemerintah berharap sektor pariwisata dapat mendorong pertumbuhan ekonomi daerah.", q: "政府は観光業（pariwisata）に何を期待していますか？", choices: ["外国人観光客を減らすこと", "地域経済の成長を促すこと", "新しい空港を建設すること", "税金を下げること"], answer: "地域経済の成長を促すこと", exp: "mendorong pertumbuhan ekonomi daerah =「地域経済の成長を後押しする」。" },
  { level: "B", passage: "Meskipun perekonomian nasional terus tumbuh, ketimpangan pendapatan antara wilayah kota dan desa masih menjadi tantangan besar. Para ahli menekankan pentingnya investasi di bidang pendidikan untuk mengatasi masalah tersebut.", q: "専門家が問題解決のために重要だと強調していることは？", choices: ["都市部の減税", "教育分野への投資", "農村部の工業化", "外国企業の誘致"], answer: "教育分野への投資", exp: "menekankan pentingnya investasi di bidang pendidikan =「教育分野への投資の重要性を強調する」。" },
];

const LEVELS = ["E", "D", "C", "B"];
const LEVEL_INFO = {
  E: { name: "Lv.1", sub: "入門", color: "#2EC4A0", soft: "#E0F7F0" },
  D: { name: "Lv.2", sub: "初級", color: "#F5A623", soft: "#FFF3DC" },
  C: { name: "Lv.3", sub: "中級", color: "#FF6FA5", soft: "#FFE4EE" },
  B: { name: "Lv.4", sub: "中上級", color: "#8E7CF8", soft: "#EEEAFF" },
};
const KIND_LABEL = {
  vocab: "🍧 単語", phrase: "🍹 熟語・フレーズ", grammar: "🌿 文法", affix: "🧩 語形変化",
  trans: "🔄 文の翻訳", order: "🧵 並べ替え", odd: "🔍 仲間はずれ", reading: "📖 読解",
};
const DISCLAIMER = "レベル表記（Lv.1〜Lv.4）はインドネシア語技能検定（E〜B級）を目安にしたオリジナル基準です。本アプリは検定の公式アプリではありません。";
const STORAGE_KEY = "selamat-custom-questions";
const SHEET_KEY = "selamat-sheet-config";
/* ↓あなたのスプレッドシートURL（初期設定として全端末で使われます） */
const DEFAULT_SHEET_URL = "https://docs.google.com/spreadsheets/d/1XOK_MwHqulF93VKql2ernEX1HK25mO1d7bqEgshFFys/edit?gid=199152471";

/* ===== 管理者設定 =====
   初期パスワードは必ず管理画面の「設定」タブから変更してください。
   メールで認証コードを送るには、EmailJS（無料）の3つのIDを下に入れます。
   未設定の間は「管理パスワード」でのログインのみ有効です。 */
const DEFAULT_ADMIN = { email: "tanaka01@hamakikaku.biz", pass: "selamat2026" };
const EMAILJS = { serviceId: "service_inype85", templateId: "template_nlm2skn", publicKey: "FXOyrZmc8SqCd7rGx" };

/* ================= ユーティリティ ================= */

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const sample = (arr, n) => shuffle(arr).slice(0, n);
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const randDir = () => (Math.random() < 0.5 ? "ij" : "ji");

function makeVocabQ(entry, dir, pool, kind = "vocab") {
  const key = dir === "ij" ? "jp" : "ind";
  const correct = entry[key];
  let cand = pool.filter((v) => v.level === entry.level && v[key] !== correct);
  if (cand.length < 3) cand = pool.filter((v) => v[key] !== correct);
  const seen = new Set([correct]);
  const distract = [];
  for (const v of shuffle(cand)) {
    if (!seen.has(v[key])) { seen.add(v[key]); distract.push(v[key]); if (distract.length === 3) break; }
  }
  return {
    kind, level: entry.level, custom: !!entry.custom,
    prompt: dir === "ij" ? entry.ind : entry.jp,
    sub: dir === "ij" ? "この言葉の意味は？" : "インドネシア語で言うと？",
    choices: shuffle([correct, ...distract]),
    answer: correct,
    exp: `${entry.ind} ＝ ${entry.jp}`,
  };
}

function makeGrammarQ(g) {
  return {
    kind: "grammar", level: g.level, custom: !!g.custom,
    prompt: g.q, sub: `「${g.hint}」`,
    choices: shuffle([...g.choices]), answer: g.answer,
    exp: g.exp || `正解：${g.answer}`,
  };
}

function makeAffixQ(g) {
  return {
    kind: "affix", level: g.level,
    prompt: g.q, sub: g.hint ? `ヒント：${g.hint}` : "接辞のはたらきを考えよう",
    choices: shuffle([...g.choices]), answer: g.answer, exp: g.exp,
  };
}

function makeTransQ(s, dir, all) {
  const key = dir === "ij" ? "jp" : "ind";
  const correct = s[key];
  let cand = all.filter((x) => x !== s && x.level === s.level);
  if (cand.length < 3) cand = all.filter((x) => x !== s);
  const distract = sample(cand, 3).map((x) => x[key]);
  return {
    kind: "trans", level: s.level,
    prompt: dir === "ij" ? s.ind : s.jp,
    sub: dir === "ij" ? "この文の意味に合う日本語は？" : "この文に合うインドネシア語は？",
    choices: shuffle([correct, ...distract]), answer: correct,
    exp: `${s.ind} ＝ ${s.jp}`,
  };
}

function makeOrderQ(o) {
  const marks = ["①", "②", "③", "④"];
  const perm = shuffle([0, 1, 2, 3]); // 表示位置 → 正順チャンク番号
  const labelOf = {};
  perm.forEach((chunkIdx, pos) => { labelOf[chunkIdx] = marks[pos]; });
  const correct = [0, 1, 2, 3].map((i) => labelOf[i]).join(" → ");
  const used = new Set([correct]);
  const wrongs = [];
  let guard = 0;
  while (wrongs.length < 3 && guard < 100) {
    guard++;
    const p = shuffle([0, 1, 2, 3]).map((i) => labelOf[i]).join(" → ");
    if (!used.has(p)) { used.add(p); wrongs.push(p); }
  }
  const listText = perm.map((ci, pos) => `${marks[pos]} ${o.chunks[ci]}`).join("\n");
  return {
    kind: "order", level: o.level,
    passage: listText,
    prompt: "正しい順番はどれ？",
    sub: `「${o.jp}」になるように並べ替えてね`,
    choices: shuffle([correct, ...wrongs]), answer: correct,
    exp: `正しい文：${o.chunks.join(" ")}（${o.jp}）`,
  };
}

function makeOddQ(cat, cats) {
  const others = cats.filter((c) => c.name !== cat.name);
  const oddCat = others[Math.floor(Math.random() * others.length)];
  const base = sample(cat.words, 3);
  const odd = sample(oddCat.words, 1)[0];
  return {
    kind: "odd", level: cat.level,
    prompt: "仲間はずれはどれ？",
    sub: "4つのうち1つだけジャンルが違うよ",
    choices: shuffle([...base.map((w) => w.w), odd.w]),
    answer: odd.w,
    exp: `${base.map((w) => `${w.w}=${w.m}`).join("、")} は「${cat.name}」。${odd.w}=${odd.m} だけ「${oddCat.name}」！`,
  };
}

function makeReadingQ(r) {
  return {
    kind: "reading", level: r.level, passage: r.passage,
    prompt: r.q, sub: "本文を読んで答えてね",
    choices: shuffle([...r.choices]), answer: r.answer, exp: r.exp,
  };
}

function filterBySrc(arr, src) {
  if (src === "builtin") return arr.filter((x) => !x.custom);
  if (src === "custom") return arr.filter((x) => x.custom);
  return arr;
}

function getTypePools(settings, pools) {
  const { level, src } = settings;
  const lvOK = (x) => level === "ALL" || x.level === level;
  const builtin = src !== "custom";
  return {
    vocab: filterBySrc(pools.vocab, src).filter(lvOK),
    phrase: filterBySrc(pools.phrases, src).filter(lvOK),
    grammar: filterBySrc(pools.grammar, src).filter(lvOK),
    affix: builtin ? AFFIX.filter(lvOK) : [],
    trans: builtin ? SENTENCES.filter(lvOK) : [],
    order: builtin ? ORDERS.filter(lvOK) : [],
    odd: builtin ? ODD_CATS.filter(lvOK) : [],
  };
}

function availableCount(type, tp) {
  if (type === "odd") return tp.odd.length ? tp.odd.length * 3 : 0;
  if (type === "mix") {
    return tp.vocab.length + tp.phrase.length + tp.grammar.length + tp.affix.length +
      tp.trans.length + tp.order.length + (tp.odd.length ? tp.odd.length * 2 : 0);
  }
  return (tp[type] || []).length;
}

function buildQuiz(settings, pools) {
  const { type, dir, n } = settings;
  const pickDir = () => (dir === "mix" ? randDir() : dir);
  const tp = getTypePools(settings, pools);

  const makers = {
    vocab: (e) => makeVocabQ(e, pickDir(), pools.vocab, "vocab"),
    phrase: (e) => makeVocabQ(e, pickDir(), [...pools.phrases, ...pools.vocab], "phrase"),
    grammar: makeGrammarQ,
    affix: makeAffixQ,
    trans: (e) => makeTransQ(e, pickDir(), SENTENCES),
    order: makeOrderQ,
    odd: (c) => makeOddQ(c, ODD_CATS),
  };

  if (type === "odd") {
    if (!tp.odd.length) return [];
    const items = [];
    const cats = shuffle(tp.odd);
    while (items.length < Math.min(n, cats.length * 3)) items.push(cats[items.length % cats.length]);
    return items.map(makers.odd);
  }
  if (type !== "mix") {
    const items = tp[type] || [];
    return sample(items, Math.min(n, items.length)).map(makers[type]);
  }
  // ミックス：全タイプからバランスよく
  const buckets = [];
  const push = (key, items) => { if (items.length) buckets.push({ key, items: shuffle([...items]) }); };
  push("vocab", tp.vocab);
  push("phrase", tp.phrase);
  push("grammar", tp.grammar);
  push("affix", tp.affix);
  push("trans", tp.trans);
  push("order", tp.order);
  push("odd", tp.odd.length ? [...tp.odd, ...tp.odd] : []);
  if (!buckets.length) return [];
  const qs = [];
  let i = 0, guard = 0;
  while (qs.length < n && guard < 500) {
    guard++;
    const b = buckets[i % buckets.length];
    i++;
    if (b.items.length) qs.push(makers[b.key](b.items.pop()));
    if (buckets.every((x) => !x.items.length)) break;
  }
  return shuffle(qs);
}

function buildMock(level, pools) {
  const lv = (x) => x.level === level;
  const q = [];
  q.push(...sample(pools.vocab.filter(lv), 7).map((e) => makeVocabQ(e, randDir(), pools.vocab, "vocab")));
  q.push(...sample(pools.phrases.filter(lv), 2).map((e) => makeVocabQ(e, randDir(), [...pools.phrases, ...pools.vocab], "phrase")));
  q.push(...sample(pools.grammar.filter(lv), 4).map(makeGrammarQ));
  q.push(...sample(AFFIX.filter(lv), 2).map(makeAffixQ));
  q.push(...sample(SENTENCES.filter(lv), 2).map((e) => makeTransQ(e, randDir(), SENTENCES)));
  q.push(...sample(ORDERS.filter(lv), 1).map(makeOrderQ));
  const oc = ODD_CATS.filter(lv);
  if (oc.length) q.push(makeOddQ(sample(oc, 1)[0], ODD_CATS));
  const body = shuffle(q);
  const r = READING.find((x) => x.level === level);
  return r ? [...body, makeReadingQ(r)] : body;
}

function estimateLevel(byLevel) {
  let est = null;
  for (const lv of LEVELS) {
    const s = byLevel[lv];
    if (!s || s.total === 0) continue;
    if (s.correct / s.total >= 0.6) est = lv;
    else break;
  }
  return est;
}

function parsePaste(text) {
  const rows = text.trim().split(/\r?\n/);
  const items = [];
  let skipped = 0;
  for (const row of rows) {
    if (!row.trim()) continue;
    const cols = row.split(/\t|,|、/).map((s) => s.trim());
    const [a, b, c] = cols;
    if (!a || !b) { skipped++; continue; }
    if (/インドネシア|日本語|単語|意味|レベル|ind|jp|level/i.test(a) && /インドネシア|日本語|単語|意味|レベル|ind|jp|level/i.test(b)) { skipped++; continue; }
    const lvRaw = (c || "E").toUpperCase();
    const map = { "1": "E", "2": "D", "3": "C", "4": "B", E: "E", D: "D", C: "C", B: "B" };
    const level = map[lvRaw] || "E";
    items.push({ id: uid(), ind: a, jp: b, level, custom: true });
  }
  return { items, skipped };
}

function buildWordsCsv(pools) {
  const rows = [["種類", "インドネシア語", "日本語", "レベル", "登録元"]];
  for (const v of pools.vocab) rows.push(["単語", v.ind, v.jp, `${LEVEL_INFO[v.level].name}(${LEVEL_INFO[v.level].sub})`, v.custom ? "マイ問題" : "内蔵"]);
  for (const p of pools.phrases) rows.push(["熟語・フレーズ", p.ind, p.jp, `${LEVEL_INFO[p.level].name}(${LEVEL_INFO[p.level].sub})`, p.custom ? "マイ問題" : "内蔵"]);
  const esc = (s) => `"${String(s).replace(/"/g, '""')}"`;
  return "\uFEFF" + rows.map((r) => r.map(esc).join(",")).join("\r\n");
}

function downloadCsv(pools) {
  const blob = new Blob([buildWordsCsv(pools)], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "selamat-words.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}

async function sendCodeByEmail(toEmail, code) {
  if (!EMAILJS.serviceId || !EMAILJS.templateId || !EMAILJS.publicKey) return false;
  try {
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: EMAILJS.serviceId,
        template_id: EMAILJS.templateId,
        user_id: EMAILJS.publicKey,
        template_params: { to_email: toEmail, code },
      }),
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}

const maskEmail = (em) => {
  const [a, b] = String(em).split("@");
  if (!b) return em;
  return (a.length <= 2 ? a[0] + "*" : a.slice(0, 2) + "***") + "@" + b;
};

/* CSVパーサー（引用符対応） */
function parseCsv(text) {
  const rows = [];
  let row = [], cur = "", inQ = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQ) {
      if (ch === '"') {
        if (text[i + 1] === '"') { cur += '"'; i++; }
        else inQ = false;
      } else cur += ch;
    } else {
      if (ch === '"') inQ = true;
      else if (ch === ",") { row.push(cur); cur = ""; }
      else if (ch === "\n") { row.push(cur); rows.push(row); row = []; cur = ""; }
      else if (ch === "\r") { /* skip */ }
      else cur += ch;
    }
  }
  row.push(cur);
  rows.push(row);
  return rows;
}

/* CSV行 → 単語アイテム */
function csvToItems(text) {
  const rows = parseCsv(text);
  const items = [];
  let skipped = 0;
  const headerRe = /インドネシア|日本語|単語|意味|レベル|ind|jp|level/i;
  for (const cols of rows) {
    const a = (cols[0] || "").trim();
    const b = (cols[1] || "").trim();
    const c = (cols[2] || "").trim();
    if (!a || !b) { skipped++; continue; }
    if (headerRe.test(a) && headerRe.test(b)) { skipped++; continue; }
    const lvRaw = c.toUpperCase();
    const map = { "1": "E", "2": "D", "3": "C", "4": "B", E: "E", D: "D", C: "C", B: "B" };
    const level = map[lvRaw] || "E";
    items.push({ id: uid(), ind: a, jp: b, level, custom: true });
  }
  return { items, skipped };
}

/* GoogleスプレッドシートのURL → CSV取得用URL */
function sheetCsvUrl(url) {
  const m = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (!m) return null;
  const gm = url.match(/[#&?]gid=(\d+)/);
  const gid = gm ? gm[1] : "0";
  return `https://docs.google.com/spreadsheets/d/${m[1]}/gviz/tq?tqx=out:csv&gid=${gid}`;
}

const LV_NUM = { E: "1", D: "2", C: "3", B: "4" };

/* ================= スタイル ================= */

const CSS = `
  .slm-root {
    --bg: #FFF5F8; --card: #FFFFFF; --ink: #43293B; --muted: #A88CA0;
    --pink: #FF6FA5; --pink-deep: #F0498B; --teal: #2EC4A0;
    --yellow: #FFC94D; --purple: #8E7CF8; --line: #FBDCE8;
    min-height: 100vh; background-color: var(--bg);
    background-image: radial-gradient(#FFDCE9 1.6px, transparent 1.6px);
    background-size: 24px 24px; color: var(--ink);
    font-family: "Zen Maru Gothic", "Hiragino Maru Gothic ProN", "Hiragino Sans", "Yu Gothic", sans-serif;
    -webkit-font-smoothing: antialiased; padding: 0 0 48px;
  }
  .slm-wrap { max-width: 460px; margin: 0 auto; padding: 20px 18px 0; }
  .slm-card {
    background: var(--card); border-radius: 24px; padding: 22px;
    box-shadow: 0 6px 24px rgba(240, 73, 139, 0.10), 0 1px 0 rgba(255,255,255,.8) inset;
    border: 1.5px solid var(--line);
  }
  .slm-h1 { font-size: 30px; font-weight: 900; letter-spacing: .02em; margin: 0; line-height: 1.2; }
  .slm-eyebrow { font-size: 12px; font-weight: 700; letter-spacing: .28em; color: var(--pink-deep); text-transform: uppercase; }
  .slm-btn {
    display: block; width: 100%; border: none; cursor: pointer;
    background: linear-gradient(135deg, var(--pink) 0%, var(--pink-deep) 100%);
    color: #fff; font-family: inherit; font-weight: 900; font-size: 17px;
    padding: 16px; border-radius: 999px; letter-spacing: .05em;
    box-shadow: 0 6px 16px rgba(240,73,139,.35); transition: transform .12s ease;
  }
  .slm-btn:active { transform: scale(.97); }
  .slm-btn:disabled { opacity: .45; box-shadow: none; cursor: default; }
  .slm-btn.teal { background: linear-gradient(135deg, #3BD6B2, #1FAE8C); box-shadow: 0 6px 16px rgba(46,196,160,.35); }
  .slm-btn.purple { background: linear-gradient(135deg, #A08FFF, #7C68F0); box-shadow: 0 6px 16px rgba(142,124,248,.35); }
  .slm-btn.sm { font-size: 14px; padding: 12px; }
  .slm-ghost {
    display: block; width: 100%; cursor: pointer; background: transparent;
    border: 2px solid var(--line); color: var(--muted); font-family: inherit;
    font-weight: 700; font-size: 14px; padding: 12px; border-radius: 999px;
  }
  .slm-chip {
    border: 2px solid var(--line); background: #fff; color: var(--muted);
    font-family: inherit; font-weight: 700; font-size: 14px;
    padding: 9px 15px; border-radius: 999px; cursor: pointer; transition: all .12s ease;
  }
  .slm-chip.on { background: var(--ink); border-color: var(--ink); color: #fff; }
  .slm-chip.sm { font-size: 12px; padding: 6px 12px; }
  .slm-chip-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
  .slm-label { font-size: 13px; font-weight: 900; color: var(--pink-deep); margin-top: 20px; display: flex; align-items: center; gap: 6px; }
  .slm-input, .slm-textarea {
    width: 100%; box-sizing: border-box; font-family: inherit; font-size: 15px;
    border: 2px solid var(--line); border-radius: 14px; padding: 11px 13px;
    color: var(--ink); background: #FFFDFE; margin-top: 8px; outline: none;
  }
  .slm-input:focus, .slm-textarea:focus { border-color: var(--pink); }
  .slm-textarea { min-height: 110px; resize: vertical; line-height: 1.7; }
  .slm-choice {
    display: block; width: 100%; text-align: left; cursor: pointer;
    background: #fff; border: 2px solid var(--line); border-radius: 18px;
    padding: 14px 16px; font-family: inherit; font-size: 16px; font-weight: 700;
    color: var(--ink); margin-top: 10px; transition: all .12s ease; line-height: 1.6;
  }
  .slm-choice:not(.locked):hover { border-color: var(--pink); }
  .slm-choice.correct { background: #E0F7F0; border-color: var(--teal); color: #0E7A61; }
  .slm-choice.wrong { background: #FFE4EE; border-color: var(--pink-deep); color: var(--pink-deep); }
  .slm-choice.dim { opacity: .45; }
  .slm-choice.locked { cursor: default; }
  .slm-badge { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 900; padding: 4px 12px; border-radius: 999px; }
  .slm-progress { height: 10px; background: #FFE4EE; border-radius: 999px; overflow: hidden; margin-top: 14px; }
  .slm-progress > div { height: 100%; background: linear-gradient(90deg, var(--pink), var(--yellow)); border-radius: 999px; transition: width .3s ease; }
  .slm-exp { margin-top: 14px; background: #FFF9EC; border: 1.5px dashed var(--yellow); border-radius: 16px; padding: 12px 14px; font-size: 14px; line-height: 1.7; }
  .slm-passage { background: #F4FBF9; border: 1.5px solid #CDEFE5; border-radius: 16px; padding: 14px; font-size: 15px; line-height: 1.9; margin-bottom: 14px; white-space: pre-line; }
  .slm-mode-card {
    display: block; width: 100%; text-align: left; cursor: pointer; font-family: inherit;
    background: #fff; border: 2px solid var(--line); border-radius: 24px;
    padding: 20px; margin-top: 14px; transition: transform .12s ease, border-color .12s;
  }
  .slm-mode-card:active { transform: scale(.98); }
  .slm-mode-card:hover { border-color: var(--pink); }
  .slm-bar-row { display: flex; align-items: center; gap: 10px; margin-top: 10px; }
  .slm-bar { flex: 1; height: 12px; background: #F6EAF1; border-radius: 999px; overflow: hidden; }
  .slm-bar > div { height: 100%; border-radius: 999px; transition: width .5s ease; }
  .slm-item { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-top: 1.5px dashed var(--line); font-size: 14px; }
  .slm-del { border: none; background: #FFE4EE; color: var(--pink-deep); border-radius: 999px; width: 30px; height: 30px; cursor: pointer; font-weight: 900; flex-shrink: 0; }
  .slm-note { font-size: 11px; color: var(--muted); line-height: 1.7; }
  .slm-float { animation: slmFloat 3s ease-in-out infinite; display: inline-block; }
  @keyframes slmFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
  @keyframes slmPop { 0% { transform: scale(.6); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
  .slm-pop { animation: slmPop .35s ease both; }
  @media (prefers-reduced-motion: reduce) { .slm-float, .slm-pop { animation: none; } }
`;

/* ================= 小物コンポーネント ================= */

function LevelBadge({ level }) {
  const info = LEVEL_INFO[level];
  return (
    <span className="slm-badge" style={{ background: info.soft, color: info.color }}>
      ★ {info.name}・{info.sub}
    </span>
  );
}

function LevelChips({ value, onChange, small }) {
  return (
    <div className="slm-chip-row">
      {LEVELS.map((lv) => (
        <button key={lv} className={`slm-chip ${small ? "sm" : ""} ${value === lv ? "on" : ""}`} onClick={() => onChange(lv)}>
          {LEVEL_INFO[lv].name}・{LEVEL_INFO[lv].sub}
        </button>
      ))}
    </div>
  );
}

function Ring({ pct, color }) {
  const R = 62;
  const C = 2 * Math.PI * R;
  return (
    <svg width="170" height="170" viewBox="0 0 170 170" className="slm-pop" role="img" aria-label={`正答率${pct}%`}>
      <circle cx="85" cy="85" r={R} fill="none" stroke="#F6EAF1" strokeWidth="14" />
      <circle cx="85" cy="85" r={R} fill="none" stroke={color} strokeWidth="14" strokeLinecap="round"
        strokeDasharray={C} strokeDashoffset={C * (1 - pct / 100)} transform="rotate(-90 85 85)"
        style={{ transition: "stroke-dashoffset 1s ease" }} />
      <text x="85" y="82" textAnchor="middle" fontSize="36" fontWeight="900" fill="#43293B" fontFamily="inherit">{pct}</text>
      <text x="85" y="106" textAnchor="middle" fontSize="15" fontWeight="700" fill="#A88CA0" fontFamily="inherit">%</text>
    </svg>
  );
}

/* ================= 画面：ホーム ================= */

function Home({ go, counts }) {
  return (
    <div className="slm-wrap">
      <div style={{ textAlign: "center", padding: "26px 0 18px" }}>
        <div style={{ fontSize: 44 }}>
          <span className="slm-float">🌺</span>
          <span className="slm-float" style={{ animationDelay: ".4s" }}>🏝️</span>
          <span className="slm-float" style={{ animationDelay: ".8s" }}>✈️</span>
        </div>
        <div className="slm-eyebrow" style={{ marginTop: 10 }}>Belajar Bahasa Indonesia</div>
        <h1 className="slm-h1" style={{ marginTop: 6 }}>
          Selamat!<br />
          <span style={{ fontSize: 20, color: "var(--muted)" }}>インドネシア語スタディ</span>
        </h1>
      </div>

      <button className="slm-mode-card" onClick={() => go("setup")}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ fontSize: 34 }}>💬</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18 }}>クイズでチェック</div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 3, lineHeight: 1.6 }}>
              単語・フレーズ・文法・語形変化・翻訳・並べ替え・仲間はずれの7タイプ
            </div>
          </div>
        </div>
      </button>

      <button className="slm-mode-card" onClick={() => go("mockSetup")} style={{ borderColor: "#DCD4FF" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ fontSize: 34 }}>📝</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18, color: "var(--purple)" }}>模試モード</div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 3, lineHeight: 1.6 }}>
              全タイプ混合の20問模試。合格圏の目安を判定するよ
            </div>
          </div>
        </div>
      </button>

      <button className="slm-mode-card" onClick={() => go("adminLogin")} style={{ borderColor: "#CDEFE5" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ fontSize: 34 }}>🔐</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18, color: "var(--teal)" }}>管理画面</div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 3, lineHeight: 1.6 }}>
              問題の追加・単語一覧のCSVダウンロード（管理者パスワードが必要です）
            </div>
          </div>
        </div>
      </button>

      <div className="slm-note" style={{ textAlign: "center", marginTop: 22 }}>
        収録：単語{counts.vocab}・フレーズ{counts.phrases}・文法{counts.grammar}・語形変化{AFFIX.length}・翻訳{SENTENCES.length}・並べ替え{ORDERS.length} ほか 🌴<br />
        {DISCLAIMER}
      </div>

      <div className="slm-note" style={{ textAlign: "center", marginTop: 18, lineHeight: 2 }}>
        <a href="https://ayopergike-yokohama.com/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--pink-deep)", fontWeight: 900, textDecoration: "none" }}>
          🌏 Ayopergi ke Yokohama
        </a>
        <br />
        X：
        <a href="https://x.com/tomotana" target="_blank" rel="noopener noreferrer" style={{ color: "var(--teal)", fontWeight: 700, textDecoration: "none" }}>
          Tomohiko Tanaka
        </a>
        {" ／ "}
        <a href="https://x.com/suka_jp" target="_blank" rel="noopener noreferrer" style={{ color: "var(--teal)", fontWeight: 700, textDecoration: "none" }}>
          IDN（アプリアップデートはこちら）
        </a>
        <br />
        Copyright ©{" "}
        <a href="https://hamakikaku.co.jp/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--muted)", fontWeight: 700, textDecoration: "underline" }}>
          HAMAKIKAKU
        </a>
        , INC. All Rights Reserved.
      </div>
    </div>
  );
}

/* ================= 画面：クイズ設定 ================= */

const TYPE_OPTIONS = [
  ["vocab", "🍧 単語"],
  ["phrase", "🍹 熟語・フレーズ"],
  ["grammar", "🌿 文法"],
  ["affix", "🧩 語形変化（語根と接辞）"],
  ["trans", "🔄 文の翻訳"],
  ["order", "🧵 並べ替え"],
  ["odd", "🔍 仲間はずれ"],
  ["mix", "🎁 ぜんぶミックス"],
];

function Setup({ settings, setSettings, onStart, onBack, pools }) {
  const s = settings;
  const set = (patch) => setSettings({ ...s, ...patch });
  const tp = getTypePools(s, pools);
  const available = availableCount(s.type, tp);
  const customCount = pools.vocab.filter((v) => v.custom).length + pools.grammar.filter((g) => g.custom).length + pools.phrases.filter((p) => p.custom).length;
  const dirRelevant = ["vocab", "phrase", "trans", "mix"].includes(s.type);

  return (
    <div className="slm-wrap">
      <div style={{ padding: "22px 0 14px" }}>
        <div className="slm-eyebrow">Quiz Setting</div>
        <h1 className="slm-h1" style={{ fontSize: 24 }}>クイズをつくる 🎀</h1>
      </div>
      <div className="slm-card">
        <div className="slm-label" style={{ marginTop: 0 }}>📚 出題タイプ</div>
        <div className="slm-chip-row">
          {TYPE_OPTIONS.map(([v, t]) => (
            <button key={v} className={`slm-chip sm ${s.type === v ? "on" : ""}`} onClick={() => set({ type: v })}>{t}</button>
          ))}
        </div>

        {dirRelevant && (
          <>
            <div className="slm-label">🔁 出題の向き</div>
            <div className="slm-chip-row">
              {[["ij", "イ語 → 日本語"], ["ji", "日本語 → イ語"], ["mix", "ミックス"]].map(([v, t]) => (
                <button key={v} className={`slm-chip ${s.dir === v ? "on" : ""}`} onClick={() => set({ dir: v })}>{t}</button>
              ))}
            </div>
          </>
        )}

        <div className="slm-label">🎯 レベル</div>
        <div className="slm-chip-row">
          <button className={`slm-chip ${s.level === "ALL" ? "on" : ""}`} onClick={() => set({ level: "ALL" })}>おまかせ（全部）</button>
          {LEVELS.map((lv) => (
            <button key={lv} className={`slm-chip ${s.level === lv ? "on" : ""}`} onClick={() => set({ level: lv })}>
              {LEVEL_INFO[lv].name}・{LEVEL_INFO[lv].sub}
            </button>
          ))}
        </div>

        <div className="slm-label">🗂️ 出題もと</div>
        <div className="slm-chip-row">
          {[["all", "ぜんぶ"], ["builtin", "内蔵だけ"], ["custom", `マイ問題だけ（${customCount}）`]].map(([v, t]) => (
            <button key={v} className={`slm-chip ${s.src === v ? "on" : ""}`} onClick={() => set({ src: v })}>{t}</button>
          ))}
        </div>
        {s.src === "custom" && (
          <div className="slm-note" style={{ marginTop: 8 }}>
            ※マイ問題だけモードでは、単語・フレーズ・文法タイプのみ出題できます
          </div>
        )}

        <div className="slm-label">🔢 問題数</div>
        <div className="slm-chip-row">
          {[5, 10, 15, 20].map((n) => (
            <button key={n} className={`slm-chip ${s.n === n ? "on" : ""}`} onClick={() => set({ n })}>{n}問</button>
          ))}
        </div>
        {available > 0 && available < s.n && (
          <div style={{ fontSize: 12, color: "var(--pink-deep)", marginTop: 10, fontWeight: 700 }}>
            ⚠️ この条件で出せるのは最大{available}問です（その数で出題します）
          </div>
        )}
        {available === 0 && (
          <div style={{ fontSize: 12, color: "var(--pink-deep)", marginTop: 10, fontWeight: 700 }}>
            ⚠️ この条件に合う問題がありません。タイプ・レベル・出題もとを変えてみてね
          </div>
        )}

        <div style={{ marginTop: 24 }}>
          <button className="slm-btn" disabled={available === 0} onClick={onStart}>スタート！ 🚀</button>
          <div style={{ height: 10 }} />
          <button className="slm-ghost" onClick={onBack}>← もどる</button>
        </div>
      </div>
    </div>
  );
}

/* ================= 画面：模試設定 ================= */

function MockSetup({ mockLevel, setMockLevel, onStart, onBack }) {
  return (
    <div className="slm-wrap">
      <div style={{ padding: "22px 0 14px" }}>
        <div className="slm-eyebrow" style={{ color: "var(--purple)" }}>Mock Exam</div>
        <h1 className="slm-h1" style={{ fontSize: 24 }}>模試モード 📝</h1>
      </div>
      <div className="slm-card">
        <div style={{ fontSize: 14, lineHeight: 1.8, color: "var(--muted)" }}>
          全20問（単語7＋フレーズ2＋文法4＋語形変化2＋翻訳2＋並べ替え1＋仲間はずれ1＋読解1）。正答率60%を合格圏の目安として判定するよ。登録したマイ問題も出題されます。
        </div>
        <div className="slm-label">🏅 チャレンジするレベルをえらぶ</div>
        <LevelChips value={mockLevel} onChange={setMockLevel} />
        <div className="slm-note" style={{ marginTop: 14 }}>{DISCLAIMER}</div>
        <div style={{ marginTop: 20 }}>
          <button className="slm-btn purple" onClick={onStart}>
            {LEVEL_INFO[mockLevel].name}（{LEVEL_INFO[mockLevel].sub}）模試をはじめる ✍️
          </button>
          <div style={{ height: 10 }} />
          <button className="slm-ghost" onClick={onBack}>← もどる</button>
        </div>
      </div>
    </div>
  );
}

/* ================= 画面：管理者ログイン ================= */

function AdminLogin({ admin, onSuccess, onBack }) {
  const [input, setInput] = useState("");
  const [sentCode, setSentCode] = useState(null);
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);

  const sendCode = async () => {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setSending(true);
    const ok = await sendCodeByEmail(admin.email, code);
    setSending(false);
    if (ok) {
      setSentCode(code);
      setMsg(`✅ ${maskEmail(admin.email)} に6桁の認証コードを送りました。届いたコードを下に入力してね（数分待っても届かない場合は迷惑メールも確認）`);
    } else {
      setMsg("⚠️ メール送信は現在未設定です。管理パスワードを入力してログインしてください。（メール認証を使うにはEmailJSの設定が必要です）");
    }
  };

  const login = () => {
    const val = input.trim();
    if ((sentCode && val === sentCode) || val === admin.pass) {
      setMsg("");
      setInput("");
      onSuccess();
    } else {
      setMsg("❌ コードまたはパスワードが違います");
    }
  };

  return (
    <div className="slm-wrap">
      <div style={{ padding: "22px 0 14px" }}>
        <div className="slm-eyebrow" style={{ color: "var(--teal)" }}>Admin Login</div>
        <h1 className="slm-h1" style={{ fontSize: 24 }}>管理者ログイン 🔐</h1>
      </div>
      <div className="slm-card">
        <div style={{ fontSize: 14, lineHeight: 1.8, color: "var(--muted)" }}>
          この先は管理者専用です。登録メールアドレス（{maskEmail(admin.email)}）宛の認証コード、または管理パスワードでログインしてください。
        </div>

        <div style={{ marginTop: 16 }}>
          <button className="slm-btn teal sm" onClick={sendCode} disabled={sending}>
            {sending ? "送信中…" : "📧 認証コードをメールで送る"}
          </button>
        </div>

        <div className="slm-label">🔑 認証コード または 管理パスワード</div>
        <input
          className="slm-input" type="password" placeholder="ここに入力"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") login(); }}
        />
        {msg && (
          <div style={{ fontSize: 13, fontWeight: 700, marginTop: 12, lineHeight: 1.7, color: msg.startsWith("✅") ? "var(--teal)" : "var(--pink-deep)" }}>
            {msg}
          </div>
        )}

        <div style={{ marginTop: 18 }}>
          <button className="slm-btn" onClick={login} disabled={!input.trim()}>ログイン</button>
          <div style={{ height: 10 }} />
          <button className="slm-ghost" onClick={onBack}>← もどる</button>
        </div>
      </div>
    </div>
  );
}

/* ================= 画面：問題管理 ================= */

function Manage({ custom, pools, admin, onSaveAdmin, onAddWord, onAddGrammar, onImport, onImportJson, onRemove, onBack, storageOk, sheetConfig, onSaveSheetConfig, onSyncSheet, sheetStatus, sheetCount }) {
  const [tab, setTab] = useState("import");
  const [sheetUrl, setSheetUrl] = useState(sheetConfig.url || "");
  const [sheetTarget, setSheetTarget] = useState(sheetConfig.target || "vocab");
  const [sheetBusy, setSheetBusy] = useState(false);
  const [backupMsg, setBackupMsg] = useState("");
  const [copyMsg, setCopyMsg] = useState("");
  const [aEmail, setAEmail] = useState(admin.email);
  const [aPass, setAPass] = useState("");
  const [aMsg, setAMsg] = useState("");
  const [pasteText, setPasteText] = useState("");
  const [pasteTarget, setPasteTarget] = useState("vocab");
  const [pasteMsg, setPasteMsg] = useState("");
  const [wType, setWType] = useState("vocab");
  const [vInd, setVInd] = useState("");
  const [vJp, setVJp] = useState("");
  const [vLv, setVLv] = useState("E");
  const [vMsg, setVMsg] = useState("");
  const [gQ, setGQ] = useState("");
  const [gHint, setGHint] = useState("");
  const [gAns, setGAns] = useState("");
  const [gD1, setGD1] = useState("");
  const [gD2, setGD2] = useState("");
  const [gD3, setGD3] = useState("");
  const [gExp, setGExp] = useState("");
  const [gLv, setGLv] = useState("E");
  const [gMsg, setGMsg] = useState("");

  const doImport = () => {
    const { items, skipped } = parsePaste(pasteText);
    if (items.length === 0) {
      setPasteMsg("読み取れる行がありませんでした。「インドネシア語, 日本語, レベル」の形式か確認してね");
      return;
    }
    const added = onImport(items, pasteTarget);
    setPasteMsg(`✅ ${added}件を登録しました！${items.length - added > 0 ? `（重複${items.length - added}件はスキップ）` : ""}${skipped > 0 ? `（読めない行${skipped}行はスキップ）` : ""}`);
    setPasteText("");
  };

  const doAddWord = () => {
    if (!vInd.trim() || !vJp.trim()) { setVMsg("インドネシア語と日本語の両方を入力してね"); return; }
    const ok = onAddWord({ id: uid(), ind: vInd.trim(), jp: vJp.trim(), level: vLv, custom: true }, wType === "vocab" ? "vocab" : "phrases");
    setVMsg(ok ? `✅ 「${vInd.trim()}」を登録しました！` : "⚠️ 同じものがすでに登録されています");
    if (ok) { setVInd(""); setVJp(""); }
  };

  const doAddGrammar = () => {
    if (!gQ.includes("___")) { setGMsg("問題文に空欄「___」（アンダーバー3つ）を入れてね"); return; }
    if (!gHint.trim() || !gAns.trim() || !gD1.trim() || !gD2.trim() || !gD3.trim()) {
      setGMsg("日本語訳・正解・ダミー3つをすべて入力してね"); return;
    }
    const answer = gAns.trim();
    onAddGrammar({
      id: uid(), level: gLv, q: gQ.trim(), hint: gHint.trim(),
      choices: [answer, gD1.trim(), gD2.trim(), gD3.trim()],
      answer, exp: gExp.trim() || `正解：${answer}`, custom: true,
    });
    setGMsg("✅ 文法問題を登録しました！");
    setGQ(""); setGHint(""); setGAns(""); setGD1(""); setGD2(""); setGD3(""); setGExp("");
  };

  /* ---- JSONバックアップ ---- */
  const doExportJson = () => {
    const data = {
      app: "selamat-indonesia",
      exportedAt: new Date().toISOString(),
      vocab: custom.vocab,
      phrases: custom.phrases,
      grammar: custom.grammar,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    const d = new Date();
    const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
    a.href = URL.createObjectURL(blob);
    a.download = `selamat-backup-${stamp}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
    setBackupMsg(`✅ バックアップファイルをダウンロードしました（単語${custom.vocab.length}・フレーズ${custom.phrases.length}・文法${custom.grammar.length}）`);
  };

  const doImportJsonFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!data || (!Array.isArray(data.vocab) && !Array.isArray(data.phrases) && !Array.isArray(data.grammar))) {
          setBackupMsg("⚠️ このファイルはSelamat!のバックアップ形式ではないようです");
          return;
        }
        const added = onImportJson(data);
        setBackupMsg(`✅ ${added}件を復元しました！（すでにある問題はスキップ）`);
      } catch (e) {
        setBackupMsg("⚠️ ファイルを読み込めませんでした。JSONファイルか確認してね");
      }
    };
    reader.readAsText(file);
  };

  /* ---- Googleスプレッドシート自動同期の設定 ---- */
  const doSheetSave = async () => {
    setSheetBusy(true);
    await onSaveSheetConfig({ url: sheetUrl.trim(), target: sheetTarget, auto: true });
    setSheetBusy(false);
  };

  const doSheetSync = async () => {
    setSheetBusy(true);
    await onSyncSheet();
    setSheetBusy(false);
  };

  /* ---- シートへ書き戻す（コピー） ---- */
  const doCopyTsv = async (target) => {
    const list = target === "phrases" ? custom.phrases : custom.vocab;
    if (!list.length) { setCopyMsg("⚠️ まだ登録がありません"); return; }
    const tsv = list.map((v) => `${v.ind}\t${v.jp}\t${LV_NUM[v.level] || "1"}`).join("\n");
    try {
      await navigator.clipboard.writeText(tsv);
      setCopyMsg(`✅ ${list.length}件をコピーしました！Googleスプレッドシートのセルを選んで貼り付け（Ctrl+V / ⌘V）してね`);
    } catch (e) {
      setCopyMsg("⚠️ コピーできませんでした。ブラウザの設定でクリップボードを許可してね");
    }
  };

  const totalCustom = custom.vocab.length + custom.grammar.length + custom.phrases.length;

  return (
    <div className="slm-wrap">
      <div style={{ padding: "22px 0 14px" }}>
        <div className="slm-eyebrow" style={{ color: "var(--teal)" }}>Admin</div>
        <h1 className="slm-h1" style={{ fontSize: 24 }}>管理画面 🔧</h1>
      </div>

      {!storageOk && (
        <div style={{ fontSize: 12, color: "var(--pink-deep)", fontWeight: 700, marginBottom: 10, lineHeight: 1.7 }}>
          ⚠️ この環境では保存機能が使えないため、追加した問題・設定はこの画面を開いている間だけ有効です
        </div>
      )}

      <div className="slm-chip-row" style={{ marginBottom: 12 }}>
        {[["import", "📋 シート貼り付け"], ["word", "🍧 単語・フレーズ追加"], ["grammar", "🌿 文法を追加"], ["list", `📚 登録済み（${totalCustom}）`], ["backup", "💾 バックアップ・シート連携"], ["csv", "📥 CSVダウンロード"], ["settings", "⚙️ 設定"]].map(([v, t]) => (
          <button key={v} className={`slm-chip sm ${tab === v ? "on" : ""}`} onClick={() => setTab(v)}>{t}</button>
        ))}
      </div>

      {tab === "import" && (
        <div className="slm-card">
          <div style={{ fontSize: 14, lineHeight: 1.8, color: "var(--muted)" }}>
            Googleスプレッドシートで範囲を選択してコピーし、そのまま下に貼り付けてね。<br />
            <b style={{ color: "var(--ink)" }}>1行＝「インドネシア語 → 日本語 → レベル（1〜4またはE/D/C/B）」</b>の順。レベル列はなくてもOK（その場合Lv.1になるよ）。
          </div>
          <div className="slm-label">📥 登録先</div>
          <div className="slm-chip-row">
            {[["vocab", "🍧 単語として"], ["phrases", "🍹 熟語・フレーズとして"]].map(([v, t]) => (
              <button key={v} className={`slm-chip sm ${pasteTarget === v ? "on" : ""}`} onClick={() => setPasteTarget(v)}>{t}</button>
            ))}
          </div>
          <textarea
            className="slm-textarea" style={{ marginTop: 14 }}
            placeholder={"例：\nmakan\t食べる\t1\nnaik daun\t人気が出る\t4"}
            value={pasteText} onChange={(e) => setPasteText(e.target.value)}
          />
          {pasteMsg && <div style={{ fontSize: 13, fontWeight: 700, marginTop: 10, color: pasteMsg.startsWith("✅") ? "var(--teal)" : "var(--pink-deep)" }}>{pasteMsg}</div>}
          <div style={{ marginTop: 14 }}>
            <button className="slm-btn teal sm" onClick={doImport} disabled={!pasteText.trim()}>まとめて登録する 📥</button>
          </div>
        </div>
      )}

      {tab === "word" && (
        <div className="slm-card">
          <div className="slm-label" style={{ marginTop: 0 }}>🏷️ 種類</div>
          <div className="slm-chip-row">
            {[["vocab", "🍧 単語"], ["phrase", "🍹 熟語・フレーズ"]].map(([v, t]) => (
              <button key={v} className={`slm-chip sm ${wType === v ? "on" : ""}`} onClick={() => setWType(v)}>{t}</button>
            ))}
          </div>
          <div className="slm-label">🇮🇩 インドネシア語</div>
          <input className="slm-input" placeholder={wType === "vocab" ? "例：kucing" : "例：naik daun"} value={vInd} onChange={(e) => setVInd(e.target.value)} />
          <div className="slm-label">🇯🇵 日本語の意味</div>
          <input className="slm-input" placeholder={wType === "vocab" ? "例：猫" : "例：人気が出る"} value={vJp} onChange={(e) => setVJp(e.target.value)} />
          <div className="slm-label">🏅 レベル</div>
          <LevelChips value={vLv} onChange={setVLv} small />
          {vMsg && <div style={{ fontSize: 13, fontWeight: 700, marginTop: 12, color: vMsg.startsWith("✅") ? "var(--teal)" : "var(--pink-deep)" }}>{vMsg}</div>}
          <div style={{ marginTop: 16 }}>
            <button className="slm-btn teal sm" onClick={doAddWord}>登録する ➕</button>
          </div>
        </div>
      )}

      {tab === "grammar" && (
        <div className="slm-card">
          <div className="slm-label" style={{ marginTop: 0 }}>📝 問題文（空欄は ___ ）</div>
          <input className="slm-input" placeholder="例：Saya ___ ke pasar." value={gQ} onChange={(e) => setGQ(e.target.value)} />
          <div className="slm-label">🇯🇵 日本語訳（ヒント）</div>
          <input className="slm-input" placeholder="例：私は市場へ行きます" value={gHint} onChange={(e) => setGHint(e.target.value)} />
          <div className="slm-label">◎ 正解</div>
          <input className="slm-input" placeholder="例：pergi" value={gAns} onChange={(e) => setGAns(e.target.value)} />
          <div className="slm-label">✕ ダミー選択肢（3つ）</div>
          <input className="slm-input" placeholder="ダミー1" value={gD1} onChange={(e) => setGD1(e.target.value)} />
          <input className="slm-input" placeholder="ダミー2" value={gD2} onChange={(e) => setGD2(e.target.value)} />
          <input className="slm-input" placeholder="ダミー3" value={gD3} onChange={(e) => setGD3(e.target.value)} />
          <div className="slm-label">💡 解説（省略OK）</div>
          <input className="slm-input" placeholder="例：pergi ke 〜 =「〜へ行く」" value={gExp} onChange={(e) => setGExp(e.target.value)} />
          <div className="slm-label">🏅 レベル</div>
          <LevelChips value={gLv} onChange={setGLv} small />
          {gMsg && <div style={{ fontSize: 13, fontWeight: 700, marginTop: 12, color: gMsg.startsWith("✅") ? "var(--teal)" : "var(--pink-deep)" }}>{gMsg}</div>}
          <div style={{ marginTop: 16 }}>
            <button className="slm-btn teal sm" onClick={doAddGrammar}>文法問題を登録する ➕</button>
          </div>
        </div>
      )}

      {tab === "list" && (
        <div className="slm-card">
          <div style={{ fontWeight: 900, fontSize: 15 }}>🍧 マイ単語（{custom.vocab.length}）</div>
          {custom.vocab.length === 0 && <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 8 }}>まだ登録がありません</div>}
          {custom.vocab.map((v) => (
            <div className="slm-item" key={v.id}>
              <span className="slm-badge" style={{ background: LEVEL_INFO[v.level].soft, color: LEVEL_INFO[v.level].color }}>{LEVEL_INFO[v.level].name}</span>
              <span style={{ flex: 1 }}><b>{v.ind}</b> ＝ {v.jp}</span>
              <button className="slm-del" onClick={() => onRemove("vocab", v.id)} aria-label="削除">✕</button>
            </div>
          ))}
          <div style={{ fontWeight: 900, fontSize: 15, marginTop: 22 }}>🍹 マイ熟語・フレーズ（{custom.phrases.length}）</div>
          {custom.phrases.length === 0 && <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 8 }}>まだ登録がありません</div>}
          {custom.phrases.map((v) => (
            <div className="slm-item" key={v.id}>
              <span className="slm-badge" style={{ background: LEVEL_INFO[v.level].soft, color: LEVEL_INFO[v.level].color }}>{LEVEL_INFO[v.level].name}</span>
              <span style={{ flex: 1 }}><b>{v.ind}</b> ＝ {v.jp}</span>
              <button className="slm-del" onClick={() => onRemove("phrases", v.id)} aria-label="削除">✕</button>
            </div>
          ))}
          <div style={{ fontWeight: 900, fontSize: 15, marginTop: 22 }}>🌿 マイ文法問題（{custom.grammar.length}）</div>
          {custom.grammar.length === 0 && <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 8 }}>まだ登録がありません</div>}
          {custom.grammar.map((g) => (
            <div className="slm-item" key={g.id}>
              <span className="slm-badge" style={{ background: LEVEL_INFO[g.level].soft, color: LEVEL_INFO[g.level].color }}>{LEVEL_INFO[g.level].name}</span>
              <span style={{ flex: 1 }}>{g.q}（正解：<b>{g.answer}</b>）</span>
              <button className="slm-del" onClick={() => onRemove("grammar", g.id)} aria-label="削除">✕</button>
            </div>
          ))}
        </div>
      )}

      {tab === "backup" && (
        <>
          <div className="slm-card">
            <div style={{ fontWeight: 900, fontSize: 15 }}>💾 JSONバックアップ（どの端末でも復元）</div>
            <div style={{ fontSize: 14, lineHeight: 1.8, color: "var(--muted)", marginTop: 8 }}>
              マイ問題（単語・フレーズ・文法）をぜんぶ1つのファイルに保存します。別のスマホやパソコンでこのファイルを読み込めば、同じ内容を復元できるよ。
            </div>
            <div style={{ marginTop: 14 }}>
              <button className="slm-btn teal sm" onClick={doExportJson}>📤 バックアップをダウンロード</button>
            </div>
            <div style={{ marginTop: 10 }}>
              <label className="slm-btn sm" style={{ textAlign: "center", cursor: "pointer", background: "linear-gradient(135deg, #A08FFF, #7C68F0)", boxShadow: "0 6px 16px rgba(142,124,248,.35)" }}>
                📥 バックアップファイルを読み込む
                <input
                  type="file" accept=".json,application/json" style={{ display: "none" }}
                  onChange={(e) => { doImportJsonFile(e.target.files[0]); e.target.value = ""; }}
                />
              </label>
            </div>
            {backupMsg && <div style={{ fontSize: 13, fontWeight: 700, marginTop: 12, lineHeight: 1.7, color: backupMsg.startsWith("✅") ? "var(--teal)" : "var(--pink-deep)" }}>{backupMsg}</div>}
          </div>

          <div className="slm-card" style={{ marginTop: 14 }}>
            <div style={{ fontWeight: 900, fontSize: 15 }}>📗 Googleシート自動同期（全端末で共通）</div>
            <div style={{ fontSize: 14, lineHeight: 1.8, color: "var(--muted)", marginTop: 8 }}>
              ここで設定したシートを、<b style={{ color: "var(--ink)" }}>アプリを開くたびに自動で読み込みます</b>。シートに単語を追加すれば、パソコンでもスマホでも次に開いたとき同じ単語が使えるよ。シートが「みんな共通の単語帳」になるイメージ！<br />
              <b style={{ color: "var(--ink)" }}>準備：</b>シートの「共有」→「リンクを知っている全員：<b style={{ color: "var(--ink)" }}>閲覧者</b>」<br />
              <b style={{ color: "var(--ink)" }}>並び：</b>A列＝インドネシア語、B列＝日本語、C列＝レベル（1〜4、省略OK）
            </div>
            {sheetStatus && (
              <div style={{ fontSize: 13, fontWeight: 700, marginTop: 12, lineHeight: 1.7, color: sheetStatus.startsWith("✅") ? "var(--teal)" : "var(--pink-deep)" }}>
                {sheetStatus}{sheetStatus.startsWith("✅") ? "" : ""}
              </div>
            )}
            <div className="slm-label">🔗 同期するシートのURL</div>
            <input
              className="slm-input" placeholder="https://docs.google.com/spreadsheets/d/…"
              value={sheetUrl} onChange={(e) => setSheetUrl(e.target.value)}
            />
            <div className="slm-label">📥 シートの単語のあつかい</div>
            <div className="slm-chip-row">
              {[["vocab", "🍧 単語として出題"], ["phrases", "🍹 熟語・フレーズとして出題"]].map(([v, t]) => (
                <button key={v} className={`slm-chip sm ${sheetTarget === v ? "on" : ""}`} onClick={() => setSheetTarget(v)}>{t}</button>
              ))}
            </div>
            <div style={{ marginTop: 14 }}>
              <button className="slm-btn teal sm" onClick={doSheetSave} disabled={sheetBusy || !sheetUrl.trim()}>
                {sheetBusy ? "同期中…" : "この設定を保存して同期する 💾"}
              </button>
            </div>
            <div style={{ marginTop: 10 }}>
              <button className="slm-ghost" onClick={doSheetSync} disabled={sheetBusy || !sheetConfig.url}>
                🔄 いま手動で同期する（現在 {sheetCount} 件）
              </button>
            </div>
            <div className="slm-note" style={{ marginTop: 10 }}>
              ※シート同期の単語はシートが本体なので、削除・修正はシート側で行ってね（アプリの登録済みリストからは消せません）。アプリ内で直接登録したマイ問題を他の端末へ移すときは、上のJSONバックアップを使ってね。
            </div>
          </div>

          <div className="slm-card" style={{ marginTop: 14 }}>
            <div style={{ fontWeight: 900, fontSize: 15 }}>📤 シートへ書き戻す（コピーして貼り付け）</div>
            <div style={{ fontSize: 14, lineHeight: 1.8, color: "var(--muted)", marginTop: 8 }}>
              マイ問題をシート貼り付け用の形式（インドネシア語・日本語・レベルの3列）でコピーします。Googleスプレッドシートを開いてセルを選び、貼り付けるだけ。
            </div>
            <div className="slm-chip-row" style={{ marginTop: 14 }}>
              <button className="slm-chip" onClick={() => doCopyTsv("vocab")}>🍧 マイ単語をコピー（{custom.vocab.length}）</button>
              <button className="slm-chip" onClick={() => doCopyTsv("phrases")}>🍹 マイフレーズをコピー（{custom.phrases.length}）</button>
            </div>
            {copyMsg && <div style={{ fontSize: 13, fontWeight: 700, marginTop: 12, lineHeight: 1.7, color: copyMsg.startsWith("✅") ? "var(--teal)" : "var(--pink-deep)" }}>{copyMsg}</div>}
            <div className="slm-note" style={{ marginTop: 10 }}>
              ※文法問題はシート形式に収まらないため、JSONバックアップに含まれます
            </div>
          </div>
        </>
      )}

      {tab === "csv" && (
        <div className="slm-card">
          <div style={{ fontWeight: 900, fontSize: 15 }}>📥 単語一覧のCSVダウンロード</div>
          <div style={{ fontSize: 14, lineHeight: 1.8, color: "var(--muted)", marginTop: 8 }}>
            登録されているすべての単語・熟語フレーズ（内蔵＋マイ問題）を、日本語とインドネシア語のペアでCSVファイルに書き出します。ExcelやGoogleスプレッドシートでそのまま開けます。
          </div>
          <div style={{ fontSize: 13, marginTop: 12, fontWeight: 700 }}>
            収録内容：単語 {pools.vocab.length}件　・　熟語・フレーズ {pools.phrases.length}件
          </div>
          <div style={{ marginTop: 16 }}>
            <button className="slm-btn teal sm" onClick={() => downloadCsv(pools)}>CSVをダウンロードする 📥</button>
          </div>
        </div>
      )}

      {tab === "settings" && (
        <div className="slm-card">
          <div style={{ fontWeight: 900, fontSize: 15 }}>⚙️ 管理者設定</div>
          <div className="slm-label">📧 管理者メールアドレス（認証コードの送り先）</div>
          <input className="slm-input" type="email" placeholder="例：admin@example.com" value={aEmail} onChange={(e) => setAEmail(e.target.value)} />
          <div className="slm-label">🔑 管理パスワードの変更（空欄なら変更しない）</div>
          <input className="slm-input" type="password" placeholder="新しいパスワード" value={aPass} onChange={(e) => setAPass(e.target.value)} />
          <div className="slm-note" style={{ marginTop: 10 }}>
            ※初期パスワードのままの場合は、必ずここで変更してください
          </div>
          {aMsg && <div style={{ fontSize: 13, fontWeight: 700, marginTop: 12, color: aMsg.startsWith("✅") ? "var(--teal)" : "var(--pink-deep)" }}>{aMsg}</div>}
          <div style={{ marginTop: 16 }}>
            <button
              className="slm-btn teal sm"
              onClick={() => {
                const email = aEmail.trim();
                if (!email.includes("@")) { setAMsg("⚠️ メールアドレスの形式を確認してね"); return; }
                if (aPass && aPass.trim().length < 6) { setAMsg("⚠️ パスワードは6文字以上にしてね"); return; }
                onSaveAdmin({ email, pass: aPass.trim() || admin.pass });
                setAPass("");
                setAMsg("✅ 設定を保存しました！");
              }}
            >
              設定を保存する 💾
            </button>
          </div>
        </div>
      )}

      <div style={{ marginTop: 16 }}>
        <button className="slm-ghost" onClick={onBack}>🏠 ホームにもどる</button>
      </div>
    </div>
  );
}

/* ================= 画面：クイズ本体 ================= */

function QuizView({ quiz, idx, picked, onPick, onNext, onQuit }) {
  const qs = quiz.questions;
  const q = qs[idx];
  const revealed = picked !== null;
  const ok = revealed && picked === q.answer;
  const promptSize = q.kind === "vocab" ? 30 : q.kind === "phrase" || q.kind === "odd" ? 24 : 20;
  return (
    <div className="slm-wrap">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 0 0" }}>
        <button className="slm-chip" onClick={onQuit}>✕ やめる</button>
        <div style={{ fontWeight: 900, fontSize: 15 }}>
          {quiz.isMock ? `${LEVEL_INFO[quiz.target].name}模試　` : ""}Q{idx + 1} <span style={{ color: "var(--muted)" }}>/ {qs.length}</span>
        </div>
      </div>
      <div className="slm-progress"><div style={{ width: `${((idx + (revealed ? 1 : 0)) / qs.length) * 100}%` }} /></div>

      <div className="slm-card" style={{ marginTop: 16 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span className="slm-badge" style={{ background: "#F6EAF1", color: "var(--muted)" }}>{KIND_LABEL[q.kind]}</span>
          {q.custom && <span className="slm-badge" style={{ background: "#E0F7F0", color: "var(--teal)" }}>✏️ マイ問題</span>}
          {revealed && <LevelBadge level={q.level} />}
        </div>

        {q.passage && <div className="slm-passage" style={{ marginTop: 14 }}>{q.passage}</div>}

        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 700 }}>{q.sub}</div>
          <div style={{ fontSize: promptSize, fontWeight: 900, marginTop: 6, lineHeight: 1.5 }}>{q.prompt}</div>
        </div>

        <div style={{ marginTop: 8 }}>
          {q.choices.map((c) => {
            let cls = "slm-choice";
            if (revealed) {
              cls += " locked";
              if (c === q.answer) cls += " correct";
              else if (c === picked) cls += " wrong";
              else cls += " dim";
            }
            return (
              <button key={c} className={cls} onClick={() => onPick(c)}>
                {revealed && c === q.answer ? "◎ " : revealed && c === picked ? "✕ " : ""}{c}
              </button>
            );
          })}
        </div>

        {revealed && (
          <div className="slm-pop">
            <div style={{ marginTop: 16, fontWeight: 900, fontSize: 18, color: ok ? "var(--teal)" : "var(--pink-deep)" }}>
              {ok ? "せいかい！ Benar! 🎉" : "ざんねん… Salah 🥲"}
            </div>
            <div className="slm-exp">💡 {q.exp}</div>
            <div style={{ marginTop: 16 }}>
              <button className={`slm-btn ${quiz.isMock ? "purple" : ""}`} onClick={onNext}>
                {idx + 1 < qs.length ? "つぎへ →" : "結果を見る 🌟"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= 画面：結果 ================= */

function ResultView({ quiz, answers, startTime, onRetry, onHome }) {
  const total = answers.length;
  const correct = answers.filter((a) => a.ok).length;
  const pct = total ? Math.round((correct / total) * 100) : 0;
  const mins = Math.max(1, Math.round((Date.now() - startTime) / 60000));

  const byLevel = {};
  for (const a of answers) {
    const lv = a.q.level;
    byLevel[lv] = byLevel[lv] || { correct: 0, total: 0 };
    byLevel[lv].total++;
    if (a.ok) byLevel[lv].correct++;
  }
  const est = estimateLevel(byLevel);
  const wrongs = answers.filter((a) => !a.ok);

  const msg =
    pct >= 90 ? "Hebat! ほぼ完璧✨" : pct >= 70 ? "Bagus! いい感じ🌸" : pct >= 50 ? "もう少し！コツコツいこう🌱" : "これから伸びるよ、Semangat!🔥";

  const tName = quiz.isMock ? `${LEVEL_INFO[quiz.target].name}（${LEVEL_INFO[quiz.target].sub}）` : "";
  const mockJudge = quiz.isMock
    ? pct >= 60
      ? { t: `🎊 ${tName} 合格圏内！`, c: "var(--teal)" }
      : pct >= 50
      ? { t: `あと一歩で${tName}合格圏 💪`, c: "var(--yellow)" }
      : { t: `${tName}はこれから！まず単語から🌱`, c: "var(--pink-deep)" }
    : null;

  return (
    <div className="slm-wrap">
      <div style={{ textAlign: "center", padding: "22px 0 6px" }}>
        <div className="slm-eyebrow">{quiz.isMock ? "Mock Exam Result" : "Hasil / 結果"}</div>
        <h1 className="slm-h1" style={{ fontSize: 24 }}>おつかれさま！ <span className="slm-float">🌺</span></h1>
      </div>

      <div className="slm-card" style={{ textAlign: "center" }}>
        <Ring pct={pct} color={quiz.isMock ? "#8E7CF8" : "#FF6FA5"} />
        <div style={{ fontWeight: 900, fontSize: 17, marginTop: 4 }}>{msg}</div>
        <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 6 }}>
          {correct} / {total} 問正解　・　所要 約{mins}分
        </div>

        {quiz.isMock ? (
          <div className="slm-pop" style={{ marginTop: 16, background: "#F7F5FF", border: "1.5px solid #DCD4FF", borderRadius: 18, padding: 14 }}>
            <div style={{ fontWeight: 900, fontSize: 18, color: mockJudge.c }}>{mockJudge.t}</div>
            <div className="slm-note" style={{ marginTop: 6 }}>
              ※合格圏の目安は正答率60%。{DISCLAIMER}
            </div>
          </div>
        ) : (
          <div className="slm-pop" style={{ marginTop: 16, background: "#FFF0F6", border: "1.5px solid var(--line)", borderRadius: 18, padding: 14 }}>
            <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 700 }}>いまの推定レベル</div>
            <div style={{ fontWeight: 900, fontSize: 20, marginTop: 4, color: est ? LEVEL_INFO[est].color : "var(--muted)" }}>
              {est ? `${LEVEL_INFO[est].name}（${LEVEL_INFO[est].sub}）相当 🏅` : "まずはLv.1の単語からスタート🌱"}
            </div>
            <div className="slm-note" style={{ marginTop: 6 }}>{DISCLAIMER}</div>
          </div>
        )}

        <div style={{ textAlign: "left", marginTop: 20 }}>
          <div style={{ fontWeight: 900, fontSize: 14 }}>レベル別の正答率</div>
          {LEVELS.filter((lv) => byLevel[lv]).map((lv) => {
            const s = byLevel[lv];
            const p = Math.round((s.correct / s.total) * 100);
            return (
              <div className="slm-bar-row" key={lv}>
                <span style={{ width: 84, fontSize: 13, fontWeight: 900, color: LEVEL_INFO[lv].color }}>{LEVEL_INFO[lv].name}・{LEVEL_INFO[lv].sub}</span>
                <div className="slm-bar"><div style={{ width: `${p}%`, background: LEVEL_INFO[lv].color }} /></div>
                <span style={{ width: 42, fontSize: 12, fontWeight: 700, color: "var(--muted)", textAlign: "right" }}>{p}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {wrongs.length > 0 && (
        <div className="slm-card" style={{ marginTop: 14 }}>
          <div style={{ fontWeight: 900, fontSize: 15 }}>📌 復習リスト（{wrongs.length}問）</div>
          {wrongs.map((a, i) => (
            <div key={i} style={{ marginTop: 12, paddingTop: 12, borderTop: "1.5px dashed var(--line)", fontSize: 14, lineHeight: 1.7 }}>
              <div style={{ fontWeight: 900 }}>{a.q.prompt}</div>
              <div style={{ color: "var(--pink-deep)" }}>あなた：{a.choice}</div>
              <div style={{ color: "var(--teal)", fontWeight: 700 }}>正解：{a.q.answer}</div>
              <div style={{ color: "var(--muted)", fontSize: 13 }}>💡 {a.q.exp}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 18 }}>
        <button className={`slm-btn ${quiz.isMock ? "purple" : ""}`} onClick={onRetry}>もう一回チャレンジ 🔁</button>
        <div style={{ height: 10 }} />
        <button className="slm-ghost" onClick={onHome}>🏠 ホームにもどる</button>
      </div>
    </div>
  );
}

/* ================= アプリ本体 ================= */

export default function App() {
  const [screen, setScreen] = useState("home");
  const [settings, setSettings] = useState({ type: "vocab", level: "ALL", dir: "ij", n: 10, src: "all" });
  const [mockLevel, setMockLevel] = useState("E");
  const [quiz, setQuiz] = useState(null);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const [custom, setCustom] = useState({ vocab: [], grammar: [], phrases: [] });
  const [adminSettings, setAdminSettings] = useState(DEFAULT_ADMIN);
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [storageOk, setStorageOk] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@500;700;900&display=swap";
    document.head.appendChild(l);
    return () => document.head.removeChild(l);
  }, []);

  useEffect(() => {
    try {
      if (typeof window === "undefined" || !window.localStorage) {
        setStorageOk(false); setLoaded(true); return;
      }
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        setCustom({ vocab: data.vocab || [], grammar: data.grammar || [], phrases: data.phrases || [] });
        if (data.admin && data.admin.email && data.admin.pass) {
          setAdminSettings({ ...DEFAULT_ADMIN, ...data.admin });
        }
      }
    } catch (e) {
      setStorageOk(false);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded || !storageOk) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...custom, admin: adminSettings }));
    } catch (e) {
      setStorageOk(false);
    }
  }, [custom, adminSettings, loaded, storageOk]);

  /* ---- Googleシート自動同期 ---- */
  const [sheetConfig, setSheetConfig] = useState({ url: DEFAULT_SHEET_URL, target: "vocab", auto: true });
  const [sheetWords, setSheetWords] = useState([]);
  const [sheetStatus, setSheetStatus] = useState("");
  const [sheetLoaded, setSheetLoaded] = useState(false);

  const syncSheet = async (cfg) => {
    const c = cfg || sheetConfig;
    if (!c.url || !c.url.trim()) {
      setSheetWords([]);
      setSheetStatus("");
      return { ok: false, msg: "URLが設定されていません" };
    }
    const csvUrl = sheetCsvUrl(c.url.trim());
    if (!csvUrl) {
      setSheetStatus("⚠️ URLの形式が正しくないみたい");
      return { ok: false, msg: "URLの形式が正しくない" };
    }
    setSheetStatus("同期中…⏳");
    try {
      const res = await fetch(csvUrl);
      if (!res.ok) throw new Error("fetch failed");
      const text = await res.text();
      if (text.trim().startsWith("<")) throw new Error("not public");
      const { items } = csvToItems(text);
      const words = items.map((it) => ({ ...it, custom: true, fromSheet: true }));
      setSheetWords(words);
      const now = new Date();
      const t = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
      setSheetStatus(`✅ シートと同期済み（${words.length}件・${t}）`);
      return { ok: true, count: words.length };
    } catch (e) {
      setSheetStatus("⚠️ シートを読めませんでした。「共有」→「リンクを知っている全員：閲覧者」になっているか確認してね");
      return { ok: false, msg: "読み込み失敗" };
    }
  };

  // 起動時：保存された同期設定を読み込んで自動同期
  useEffect(() => {
    let cfg = { url: DEFAULT_SHEET_URL, target: "vocab", auto: true };
    try {
      const raw = window.localStorage && window.localStorage.getItem(SHEET_KEY);
      if (raw) cfg = { ...cfg, ...JSON.parse(raw) };
    } catch (e) { /* 既定値を使用 */ }
    setSheetConfig(cfg);
    setSheetLoaded(true);
    if (cfg.auto && cfg.url) syncSheet(cfg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 同期設定の保存
  useEffect(() => {
    if (!sheetLoaded) return;
    try {
      window.localStorage.setItem(SHEET_KEY, JSON.stringify(sheetConfig));
    } catch (e) { /* 保存不可でも動作は継続 */ }
  }, [sheetConfig, sheetLoaded]);

  const saveSheetConfig = (cfg) => {
    setSheetConfig(cfg);
    return syncSheet(cfg);
  };

  /* 単語の重複を除いて結合（内蔵・マイ・シートの順で優先） */
  const mergeWords = (base, extra) => {
    const seen = new Set(base.map((v) => `${(v.ind || "").toLowerCase()}|${v.jp}`));
    const out = [...base];
    for (const v of extra) {
      const k = `${(v.ind || "").toLowerCase()}|${v.jp}`;
      if (!seen.has(k)) { seen.add(k); out.push(v); }
    }
    return out;
  };

  const pools = {
    vocab: mergeWords([...VOCAB, ...custom.vocab], sheetConfig.target === "vocab" ? sheetWords : []),
    grammar: [...GRAMMAR, ...custom.grammar],
    phrases: mergeWords([...PHRASES, ...custom.phrases], sheetConfig.target === "phrases" ? sheetWords : []),
  };

  const start = (questions, isMock, target) => {
    if (!questions.length) return;
    setQuiz({ questions, isMock, target });
    setIdx(0);
    setPicked(null);
    setAnswers([]);
    setStartTime(Date.now());
    setScreen("quiz");
  };

  const pick = (choice) => {
    if (picked !== null) return;
    setPicked(choice);
    const q = quiz.questions[idx];
    setAnswers((a) => [...a, { q, choice, ok: choice === q.answer }]);
  };

  const next = () => {
    if (idx + 1 < quiz.questions.length) {
      setIdx(idx + 1);
      setPicked(null);
    } else {
      setScreen("result");
    }
  };

  const addWord = (item, target) => {
    const list = target === "phrases" ? pools.phrases : pools.vocab;
    const dup = list.some((v) => v.ind.toLowerCase() === item.ind.toLowerCase() && v.jp === item.jp);
    if (dup) return false;
    setCustom((c) => ({ ...c, [target]: [...c[target], item] }));
    return true;
  };

  const importWords = (items, target) => {
    let added = 0;
    setCustom((c) => {
      const base = target === "phrases" ? [...PHRASES, ...c.phrases] : [...VOCAB, ...c.vocab];
      const existing = new Set(base.map((v) => `${v.ind.toLowerCase()}|${v.jp}`));
      const fresh = [];
      for (const it of items) {
        const key = `${it.ind.toLowerCase()}|${it.jp}`;
        if (!existing.has(key)) { existing.add(key); fresh.push(it); }
      }
      added = fresh.length;
      return { ...c, [target]: [...c[target], ...fresh] };
    });
    return added;
  };

  const addGrammar = (item) => {
    setCustom((c) => ({ ...c, grammar: [...c.grammar, item] }));
    return true;
  };

  /* JSONバックアップからの一括復元（重複はスキップ） */
  const importJson = (data) => {
    let added = 0;
    const next = { vocab: [...custom.vocab], phrases: [...custom.phrases], grammar: [...custom.grammar] };

    const normalize = (it) => ({
      ...it,
      id: it.id || uid(),
      custom: true,
      level: LEVELS.includes(it.level) ? it.level : "E",
    });

    const addWords = (key, items, builtins) => {
      if (!Array.isArray(items)) return;
      const existing = new Set([...builtins, ...next[key]].map((v) => `${(v.ind || "").toLowerCase()}|${v.jp}`));
      for (const raw of items) {
        if (!raw || !raw.ind || !raw.jp) continue;
        const it = normalize(raw);
        const k = `${it.ind.toLowerCase()}|${it.jp}`;
        if (!existing.has(k)) { existing.add(k); next[key].push(it); added++; }
      }
    };
    addWords("vocab", data.vocab, VOCAB);
    addWords("phrases", data.phrases, PHRASES);

    if (Array.isArray(data.grammar)) {
      const existing = new Set([...GRAMMAR, ...next.grammar].map((g) => `${g.q}|${g.answer}`));
      for (const raw of data.grammar) {
        if (!raw || !raw.q || !raw.answer || !Array.isArray(raw.choices)) continue;
        const it = normalize(raw);
        const k = `${it.q}|${it.answer}`;
        if (!existing.has(k)) { existing.add(k); next.grammar.push(it); added++; }
      }
    }

    setCustom(next);
    return added;
  };

  const removeItem = (kind, id) => {
    setCustom((c) => ({ ...c, [kind]: c[kind].filter((x) => x.id !== id) }));
  };

  const counts = {
    vocab: pools.vocab.length,
    grammar: pools.grammar.length,
    phrases: pools.phrases.length,
  };

  const go = (s) => {
    if (s === "adminLogin" && adminAuthed) setScreen("manage");
    else setScreen(s);
  };

  return (
    <div className="slm-root">
      <style>{CSS}</style>
      {screen === "home" && <Home go={go} counts={counts} />}
      {screen === "adminLogin" && (
        <AdminLogin
          admin={adminSettings}
          onSuccess={() => { setAdminAuthed(true); setScreen("manage"); }}
          onBack={() => setScreen("home")}
        />
      )}
      {screen === "setup" && (
        <Setup
          settings={settings} setSettings={setSettings} pools={pools}
          onStart={() => start(buildQuiz(settings, pools), false, null)}
          onBack={() => setScreen("home")}
        />
      )}
      {screen === "mockSetup" && (
        <MockSetup
          mockLevel={mockLevel} setMockLevel={setMockLevel}
          onStart={() => start(buildMock(mockLevel, pools), true, mockLevel)}
          onBack={() => setScreen("home")}
        />
      )}
      {screen === "manage" && (
        <Manage
          custom={custom} pools={pools} storageOk={storageOk}
          admin={adminSettings} onSaveAdmin={setAdminSettings}
          onAddWord={addWord} onAddGrammar={addGrammar}
          onImport={importWords} onImportJson={importJson} onRemove={removeItem}
          sheetConfig={sheetConfig} onSaveSheetConfig={saveSheetConfig}
          onSyncSheet={() => syncSheet()} sheetStatus={sheetStatus} sheetCount={sheetWords.length}
          onBack={() => setScreen("home")}
        />
      )}
      {screen === "quiz" && quiz && (
        <QuizView quiz={quiz} idx={idx} picked={picked} onPick={pick} onNext={next} onQuit={() => setScreen("home")} />
      )}
      {screen === "result" && quiz && (
        <ResultView
          quiz={quiz} answers={answers} startTime={startTime}
          onRetry={() => start(quiz.isMock ? buildMock(quiz.target, pools) : buildQuiz(settings, pools), quiz.isMock, quiz.target)}
          onHome={() => setScreen("home")}
        />
      )}
    </div>
  );
}
