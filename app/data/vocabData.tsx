import { Heart, Feather, Sun, School, ShieldAlert, Users, Home, Apple, Gamepad2, Book, Music, TreePine, Car, Compass, Smile, Globe } from "lucide-react";

export const allGradesData: Record<string, any> = {
  P1: {
    huanleHuoban: [
      {
        title: "第一单元：认识学校",
        icon: <School className="w-6 h-6 text-indigo-500" />,
        items: [
          { word: "老师", pinyin: "lǎo shī", desc: "教导学生的人。" },
          { word: "同学", pinyin: "tóng xué", desc: "在同一个学校学习的人。" },
          { word: "操场", pinyin: "cāo chǎng", desc: "学校里供体育活动用的场地。" },
          { word: "教室", pinyin: "jiào shì", desc: "学校里进行教学活动的房间。" },
        ]
      },
      {
        title: "第二单元：我的身体",
        icon: <Smile className="w-6 h-6 text-pink-500" />,
        items: [
          { word: "眼睛", pinyin: "yǎn jing", desc: "用来看东西的器官。" },
          { word: "耳朵", pinyin: "ěr duo", desc: "用来听声音的器官。" },
          { word: "嘴巴", pinyin: "zuǐ ba", desc: "用来吃饭和说话的器官。" },
          { word: "头发", pinyin: "tóu fa", desc: "长在头上的毛发。" },
        ]
      },
      {
        title: "第三单元：我爱我家",
        icon: <Home className="w-6 h-6 text-orange-500" />,
        items: [
          { word: "爸爸", pinyin: "bà ba", desc: "父亲。" },
          { word: "妈妈", pinyin: "mā ma", desc: "母亲。" },
          { word: "哥哥", pinyin: "gē ge", desc: "同父母所生而比自己年长的男子。" },
          { word: "妹妹", pinyin: "mèi mei", desc: "同父母所生而比自己年幼的女子。" },
        ]
      }
    ],
    goodSentences: [
      {
        category: "简单的句子",
        sentences: [
          "我是小学生，我爱我的学校。",
          "我的家里有爸爸、妈妈和我，我们很开心。"
        ]
      }
    ]
  },
  P2: {
    huanleHuoban: [
      {
        title: "第一单元：去游乐场",
        icon: <Gamepad2 className="w-6 h-6 text-purple-500" />,
        items: [
          { word: "滑梯", pinyin: "huá tī", desc: "一种儿童游乐设施。" },
          { word: "秋千", pinyin: "qiū qiān", desc: "一种游乐设施，悬挂着可以摆动。" },
          { word: "高兴", pinyin: "gāo xìng", desc: "愉快而兴奋。" },
          { word: "捉迷藏", pinyin: "zhuō mí cáng", desc: "一种儿童游戏，一个人蒙住眼睛寻找躲藏的人。" },
        ]
      },
      {
        title: "第二单元：食物与水果",
        icon: <Apple className="w-6 h-6 text-red-500" />,
        items: [
          { word: "苹果", pinyin: "píng guǒ", desc: "一种圆形的红色或绿色水果。" },
          { word: "香蕉", pinyin: "xiāng jiāo", desc: "一种黄色的长条形水果。" },
          { word: "早餐", pinyin: "zǎo cān", desc: "早上吃的一顿饭。" },
          { word: "健康", pinyin: "jiàn kāng", desc: "身体好，没有疾病。" },
        ]
      },
      {
        title: "第三单元：可爱的动物",
        icon: <Feather className="w-6 h-6 text-green-500" />,
        items: [
          { word: "尾巴", pinyin: "wěi ba", desc: "动物身体后部突出的部分。" },
          { word: "猴子", pinyin: "hóu zi", desc: "一种哺乳动物，非常灵活。" },
          { word: "大象", pinyin: "dà xiàng", desc: "一种体型庞大，有长鼻子的动物。" },
          { word: "聪明", pinyin: "cōng míng", desc: "智力发达，记忆和理解能力强。" },
        ]
      }
    ],
    goodSentences: [
      {
        category: "看图写话常用句",
        sentences: [
          "公园里开满了五颜六色的花朵，美丽极了。",
          "下课了，同学们在操场上开心地玩耍。"
        ]
      }
    ]
  },
  P3: {
    huanleHuoban: [
      {
        title: "第一单元：社区生活",
        icon: <Compass className="w-6 h-6 text-blue-500" />,
        items: [
          { word: "邻居", pinyin: "lín jū", desc: "住处相近的人。" },
          { word: "打招呼", pinyin: "dǎ zhāo hu", desc: "用语言或动作表示问候。" },
          { word: "帮助", pinyin: "bāng zhù", desc: "替人出力、出主意或给以物质上、精神上的支援。" },
          { word: "公园", pinyin: "gōng yuán", desc: "供公众游览休息的园林。" },
          { word: "礼貌", pinyin: "lǐ mào", desc: "言语动作谦虚恭敬的表现。" }
        ]
      },
      {
        title: "第二单元：各种各样的职业",
        icon: <Users className="w-6 h-6 text-teal-500" />,
        items: [
          { word: "警察", pinyin: "jǐng chá", desc: "维持社会治安的人员。" },
          { word: "医生", pinyin: "yī shēng", desc: "掌握医药卫生知识，从事疾病预防和治疗的专业人员。" },
          { word: "保护", pinyin: "bǎo hù", desc: "尽力照顾，使不受损害。" },
          { word: "辛苦", pinyin: "xīn kǔ", desc: "身心劳苦。" },
        ]
      }
    ],
    linkingWords: [
      { word: "因为...所以...", type: "因果", example: "因为他生病了，所以没有来上学。" },
      { word: "虽然...但是...", type: "转折", example: "虽然雨下得很大，但是他还是准时到了。" }
    ]
  },
  P4: {
    huanleHuoban: [
      {
        title: "第一单元：交通与安全",
        icon: <Car className="w-6 h-6 text-red-500" />,
        items: [
          { word: "遵守", pinyin: "zūn shǒu", desc: "依照规定行动；不违背。" },
          { word: "规则", pinyin: "guī zé", desc: "规定出来供大家共同遵守的制度或章程。" },
          { word: "危险", pinyin: "wēi xiǎn", desc: "有遭到损害或失败的可能。" },
          { word: "指挥", pinyin: "zhǐ huī", desc: "发令调度。" },
          { word: "小心", pinyin: "xiǎo xīn", desc: "畏忌；顾虑。" }
        ]
      },
      {
        title: "第二单元：爱好与特长",
        icon: <Music className="w-6 h-6 text-purple-500" />,
        items: [
          { word: "钢琴", pinyin: "gāng qín", desc: "一种键盘乐器。" },
          { word: "参加", pinyin: "cān jiā", desc: "加入某种组织或某种活动。" },
          { word: "比赛", pinyin: "bǐ sài", desc: "在体育、生产等活动中，比较本领、技术的高低。" },
          { word: "坚持", pinyin: "jiān chí", desc: "坚决保持、维护或进行。" },
        ]
      }
    ],
    linkingWords: [
      { word: "不仅...而且...", type: "递进", example: "他不仅功课好，而且体育也很棒。" },
      { word: "如果...就...", type: "假设", example: "如果明天下雨，我们就不去郊游了。" }
    ],
    confusedWords: [
      { group: ["继续 (jì xù)", "连续 (lián xù)", "陆续 (lù xù)"], desc: "继续：完成一件事，中途停下来，之后又从这里开始。连续：一次接着一次，没有间断。陆续：先先后后，时断时续。" }
    ]
  },
  P5: {
    huanleHuoban: [
      {
        title: "第一单元：环境保护",
        icon: <TreePine className="w-6 h-6 text-green-600" />,
        items: [
          { word: "污染", pinyin: "wū rǎn", desc: "使沾染上肮脏的东西或有害的物质。" },
          { word: "浪费", pinyin: "làng fèi", desc: "对人力、财物、时间等用得不当或没有节制。" },
          { word: "节约", pinyin: "jié yuē", desc: "节省（多用于较大的范围）。" },
          { word: "分类", pinyin: "fēn lèi", desc: "按照种类、等级或性质分别归类。" },
          { word: "意识", pinyin: "yì shí", desc: "人的头脑对于客观物质世界的反映。" }
        ]
      },
      {
        title: "第二单元：科技与生活",
        icon: <Globe className="w-6 h-6 text-blue-600" />,
        items: [
          { word: "网络", pinyin: "wǎng luò", desc: "用通信线路和通信设备将分布在不同地点的多台计算机连接起来。" },
          { word: "沉迷", pinyin: "chén mí", desc: "深深地迷恋着，不能自拔。" },
          { word: "自律", pinyin: "zì lǜ", desc: "遵循法度，自加约束。" },
          { word: "便利", pinyin: "biàn lì", desc: "使用或行动起来不感觉困难；容易达到目的。" },
        ]
      }
    ],
    vocabCategories: [
      {
        title: "描写情绪反应",
        icon: <Heart className="w-6 h-6 text-rose-500" />,
        items: [
          { word: "怒气冲冲", pinyin: "nù qì chōng chōng", desc: "形容非常生气的样子。" },
          { word: "委屈", pinyin: "wěi qū", desc: "受到不应有的指责或待遇，心里难过。" },
          { word: "后悔", pinyin: "hòu huǐ", desc: "事后懊悔。" },
          { word: "感动", pinyin: "gǎn dòng", desc: "思想感情受外界事物的影响而激动，引起同情或向慕。" }
        ]
      }
    ],
    linkingWords: [
      { word: "无论...都...", type: "条件关系", example: "无论遇到多大的困难，他都不退缩。" },
      { word: "即使...也...", type: "让步假设", example: "即使明天下大雨，比赛也会照常进行。" }
    ],
    confusedWords: [
      { group: ["反映 (fǎn yìng)", "反应 (fǎn yìng)"], desc: "反映：把客观事物的实质表现出来；反应：机体受到体内或体外的刺激而引起的相应的活动。" },
      { group: ["必须 (bì xū)", "必需 (bì xū)"], desc: "必须：表示事理上和情理上必要；必需：一定要有，不可少。" }
    ]
  },
  P6: {
    huanleHuoban: [
      {
        title: "第一单元：《加油！加油！》",
        icon: <School className="w-6 h-6 text-indigo-500" />,
        items: [
          { word: "勇敢", pinyin: "yǒng gǎn", desc: "不怕危险和困难；有胆量。" },
          { word: "克服", pinyin: "kè fú", desc: "用坚强的意志和力量战胜困难或缺点。" },
          { word: "压力", pinyin: "yā lì", desc: "比喻对人起逼迫威慑作用的力量。" },
          { word: "吸引", pinyin: "xī yǐn", desc: "把别人的注意力引过来。" },
          { word: "懒惰", pinyin: "lǎn duò", desc: "不爱劳动和工作；不勤快。" },
          { word: "锻炼", pinyin: "duàn liàn", desc: "通过体育运动使身体强壮。" },
          { word: "测验", pinyin: "cè yàn", desc: "考查学习成绩等。" },
          { word: "严格", pinyin: "yán gé", desc: "在执行制度或掌握标准时认真、不放松。" },
          { word: "勤奋", pinyin: "qín fèn", desc: "不懈地努力（工作或学习）。" },
          { word: "目标", pinyin: "mù biāo", desc: "想要达到的境地或标准。" }
        ]
      },
      {
        title: "第二单元：《祖孙情》",
        icon: <Heart className="w-6 h-6 text-rose-500" />,
        items: [
          { word: "回忆", pinyin: "huí yì", desc: "回想过去的事物。" },
          { word: "庆祝", pinyin: "qìng zhù", desc: "为共同的喜事进行活动表示高兴或纪念。" },
          { word: "共同", pinyin: "gòng tóng", desc: "大家一起（做）。" },
          { word: "方便", pinyin: "fāng biàn", desc: "便利；适合。" },
          { word: "报名", pinyin: "bào míng", desc: "把自己的名字报告给主管的人，表示愿意参加活动。" },
          { word: "陪伴", pinyin: "péi bàn", desc: "随同做伴。" },
          { word: "体谅", pinyin: "tǐ liàng", desc: "设身处地为人着想，给以谅解。" },
          { word: "感激", pinyin: "gǎn jī", desc: "因为别人的好意或帮助而对他产生好感。" },
          { word: "疼爱", pinyin: "téng ài", desc: "关切喜爱（多用于长辈对晚辈）。" },
          { word: "慈祥", pinyin: "cí xiáng", desc: "（老年人的态度、神色）和蔼安详。" }
        ]
      },
      {
        title: "第三单元：《美食小侦探》",
        icon: <Apple className="w-6 h-6 text-amber-500" />,
        items: [
          { word: "免费", pinyin: "miǎn fèi", desc: "不收费。" },
          { word: "智慧", pinyin: "zhì huì", desc: "辨析判断、发明创造的能力。" },
          { word: "团结", pinyin: "tuán jié", desc: "为了集中力量实现共同理想或完成任务而联合或结合。" },
          { word: "模仿", pinyin: "mó fǎng", desc: "照某种现成的样子学着做。" },
          { word: "折断", pinyin: "zhé duàn", desc: "因受力过大或过猛而断裂。" },
          { word: "品尝", pinyin: "pǐn cháng", desc: "仔细地辨别、尝试（滋味）。" },
          { word: "传统", pinyin: "chuán tǒng", desc: "世代相传的具有特点的社会因素。" },
          { word: "材料", pinyin: "cái liào", desc: "可以直接造成成品的东西。" },
          { word: "独特", pinyin: "dú tè", desc: "独有的；特别的。" },
          { word: "熟悉", pinyin: "shú xī", desc: "知道得很清楚。" }
        ]
      },
      {
        title: "第四单元：《科技改变生活》",
        icon: <Globe className="w-6 h-6 text-blue-600" />,
        items: [
          { word: "科技", pinyin: "kē jì", desc: "科学技术。" },
          { word: "沉迷", pinyin: "chén mí", desc: "深深地迷恋着，不能自拔。" },
          { word: "依赖", pinyin: "yī lài", desc: "依靠某种人或事物而不能自立或自给。" },
          { word: "沟通", pinyin: "gōu tōng", desc: "使两方能通连（如思想、观念等）。" },
          { word: "搜索", pinyin: "sōu suǒ", desc: "仔细查找。" },
          { word: "距离", pinyin: "jù lí", desc: "在空间或时间上相隔（的长度）。" },
          { word: "取代", pinyin: "qǔ dài", desc: "代替（别人的位置）。" },
          { word: "缺乏", pinyin: "quē fá", desc: "没有或不够。" },
          { word: "视力", pinyin: "shì lì", desc: "在一定距离内眼睛辨别物体形状的能力。" },
          { word: "普遍", pinyin: "pǔ biàn", desc: "存在的面很广；具有共同性的。" }
        ]
      },
      {
        title: "第五单元：《环保小卫士》",
        icon: <TreePine className="w-6 h-6 text-green-600" />,
        items: [
          { word: "污染", pinyin: "wū rǎn", desc: "使沾染上肮脏的东西或有害的物质。" },
          { word: "节约", pinyin: "jié yuē", desc: "节省（多用于较大的范围）。" },
          { word: "塑料", pinyin: "sù liào", desc: "一种工业材料（Plastic）。" },
          { word: "分类", pinyin: "fēn lèi", desc: "按照种类、等级或性质分别归类。" },
          { word: "保护", pinyin: "bǎo hù", desc: "尽力照顾，使不受损害。" },
          { word: "浪费", pinyin: "làng fèi", desc: "对人力、财物等用得不当或没有节制。" },
          { word: "资源", pinyin: "zī yuán", desc: "生产资料或生活资料的天然来源。" },
          { word: "习惯", pinyin: "xí guàn", desc: "在长时期里逐渐养成的一时不容易改变的行为。" },
          { word: "责任", pinyin: "zé rèn", desc: "分内应做的事。" },
          { word: "提醒", pinyin: "tí xǐng", desc: "从旁指点，促使注意。" }
        ]
      },
      {
        title: "第六单元：《我爱新加坡》",
        icon: <Compass className="w-6 h-6 text-red-500" />,
        items: [
          { word: "历史", pinyin: "lì shǐ", desc: "过去的事实。" },
          { word: "建国", pinyin: "jiàn guó", desc: "建立国家。" },
          { word: "贡献", pinyin: "gòng xiàn", desc: "对国家或公众所做的有益的事。" },
          { word: "繁荣", pinyin: "fán róng", desc: "（经济或事业）蓬勃发展。" },
          { word: "和谐", pinyin: "hé xié", desc: "配合得适当和匀称（多指关系）。" },
          { word: "尊重", pinyin: "zūn zhòng", desc: "尊敬、重视。" },
          { word: "种族", pinyin: "zhǒng zú", desc: "具有共同起源和共同遗传特征的人群。" },
          { word: "骄傲", pinyin: "jiāo ào", desc: "自以为了不起，看不起别人；也指自豪。" },
          { word: "独立", pinyin: "dú lì", desc: "一个国家或一个政权不受别的国家或政权的控制而自主地存在。" },
          { word: "纪念", pinyin: "jì niàn", desc: "用事物或行动对人或事表示怀念。" }
        ]
      }
    ],
    vocabCategories: [
      {
        title: "描写心情 (成语)",
        icon: <Heart className="w-6 h-6 text-rose-500" />,
        items: [
          { word: "兴高采烈", pinyin: "xìng gāo cǎi liè", desc: "形容非常高兴的样子。" },
          { word: "不知所措", pinyin: "bù zhī suǒ cuò", desc: "形容不知道该怎么办才好。" },
          { word: "惊慌失措", pinyin: "jīng huāng shī cuò", desc: "吓得慌了手脚，不知如何是好。" },
          { word: "迫不及待", pinyin: "pò bù jí dài", desc: "急迫得不能再等待。" },
          { word: "依依不舍", pinyin: "yī yī bù shě", desc: "形容非常留恋，舍不得离开。" }
        ]
      },
      {
        title: "描写动作 (成语)",
        icon: <Feather className="w-6 h-6 text-blue-500" />,
        items: [
          { word: "津津有味", pinyin: "jīn jīn yǒu wèi", desc: "形容吃东西或看书很有味道。" },
          { word: "手舞足蹈", pinyin: "shǒu wǔ zú dǎo", desc: "形容高兴到了极点。" },
          { word: "小心翼翼", pinyin: "xiǎo xīn yì yì", desc: "形容非常谨慎，不敢疏忽。" },
          { word: "东张西望", pinyin: "dōng zhāng xī wàng", desc: "向四处张望。" }
        ]
      },
      {
        title: "描写天气 (成语)",
        icon: <Sun className="w-6 h-6 text-amber-500" />,
        items: [
          { word: "风和日丽", pinyin: "fēng hé rì lì", desc: "形容天气晴朗暖和。" },
          { word: "倾盆大雨", pinyin: "qīng pén dà yǔ", desc: "形容雨下得很大。" },
          { word: "骄阳似火", pinyin: "jiāo yáng sì huǒ", desc: "形容太阳很大，天气非常热。" },
          { word: "万里无云", pinyin: "wàn lǐ wú yún", desc: "形容天气十分晴朗。" }
        ]
      }
    ],
    linkingWords: [
      { word: "因为...所以...", type: "因果关系", example: "因为下大雨，所以我没有去踢球。" },
      { word: "虽然...但是...", type: "转折关系", example: "虽然题目很难，但是他没有放弃。" },
      { word: "不但...而且...", type: "递进关系", example: "小明不但功课好，而且很懂事。" },
      { word: "无论...都...", type: "条件关系", example: "无论遇到多大的困难，我们都要坚持到底。" },
      { word: "既然...就...", type: "因果/条件", example: "既然你已经答应了，就要说到做到。" }
    ],
    confusedWords: [
      { group: ["既然 (jì rán)", "然后 (rán hòu)", "竟然 (jìng rán)"], desc: "既然=既然如此；然后=表示接着发生；竟然=出乎意料。" },
      { group: ["鼓励 (gǔ lì)", "奖励 (jiǎng lì)", "勉励 (miǎn lì)"], desc: "鼓励=激发勉励；奖励=用财物给以鼓励；勉励=劝人努力。" },
      { group: ["访问 (fǎng wèn)", "拜访 (bài fǎng)", "探望 (tàn wàng)"], desc: "访问=有目的地去看人；拜访=敬辞，看望别人；探望=看望（多指看病或看长辈）。" },
      { group: ["发扬 (fā yáng)", "发挥 (fā huī)", "发展 (fā zhǎn)"], desc: "发扬=发展提倡（如优良作风）；发挥=把内在表现出来（如发挥作用）；发展=事物由小到大。" }
    ],
    goodSentences: [
      {
        category: "描写人物外貌",
        sentences: [
          "她有一双水汪汪的大眼睛，笑起来像弯弯的月牙。",
          "爷爷满头白发，脸上的皱纹像一条条深深的沟壑。"
        ]
      },
      {
        category: "描写人物心理与动作",
        sentences: [
          "我的心像揣了一只小兔子，砰砰直跳。",
          "他急得像热锅上的蚂蚁，在房间里走来走去。",
          "泪水像断了线的珍珠，顺着她的脸颊流了下来。"
        ]
      },
      {
        category: "景物描写",
        sentences: [
          "微风吹过，树叶沙沙作响，仿佛在唱着一首轻柔的歌。",
          "天边的晚霞红彤彤的，把整个天空都染上了颜色。"
        ]
      }
    ]
  }
};
