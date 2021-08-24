const {model, Schema} = require('mongoose')

const schema_u = new Schema({
    content:{type: String, required: true, unique: true},
    lvl: {type: Number, required: true},
    isEnd: {type: Boolean, required: true},
    answers: [
        {
            content: {type: String, required: true}, 
            next_question_id: {type: String, required: true, default: '0'}, 
            mag01_04_02:{ 
                name: {type: String, require: true, default: '01.04.02'},
                value: {type: Number, require: true, default: 0},
                magdet1_1:{
                    name: {type: String, require: true, default: 'Математическое моделирование в инженерных науках'},
                    value: {type: Number, require: true, default: 0}
                },
                magdet1_2:{
                    name: {type: String, require: true, default: 'Прикладная математика для высокопроизводительных вычислительных систем'},
                    value: {type: Number, require: true, default: 0}
                }
            },
            mag09_04_01:{ 
                name: {type: String, require: true, default: '09.04.01'},
                value: {type: Number, require: true, default: 0},
                magdet2_1:{
                    name: {type: String, require: true, default: 'Высокопроизводительные вычислительные системы и квантовая обработка информации'},
                    value: {type: Number, require: true, default: 0}
                },
                magdet2_2:{
                    name: {type: String, require: true, default: 'Интеллектуальные системы'},
                    value: {type: Number, require: true, default: 0}
                },
                magdet2_3:{
                    name: {type: String, require: true, default: 'Информационное и программное обеспечение автоматизированных систем'},
                    value: {type: Number, require: true, default: 0}
                },
                magdet2_4:{
                    name: {type: String, require: true, default: 'Разработка информационных систем и web-приложений'},
                    value: {type: Number, require: true, default: 0}
                },
                magdet2_5:{
                    name: {type: String, require: true, default: 'Системная интеграция и управление бизнес-процессами'},
                    value: {type: Number, require: true, default: 0}
                },
                magdet2_6:{
                    name: {type: String, require: true, default: 'IT-management'},
                    value: {type: Number, require: true, default: 0}
                }
            },
            mag09_04_03:{ 
                name: {type: String, require: true, default: '09.04.03'},
                value: {type: Number, require: true, default: 0},
                magdet3_1:{
                    name: {type: String, require: true, default: 'Машинное обучение и технологии больших данных'},
                    value: {type: Number, require: true, default: 0}
                },
                magdet3_2:{
                    name: {type: String, require: true, default: 'Эгродизайн пользовательского интерфейса'},
                    value: {type: Number, require: true, default: 0}
                }
            },
            mag09_04_04:{ 
                name: {type: String, require: true, default: '09.04.04'},
                value: {type: Number, require: true, default: 0},
                magdet4_1:{
                    name: {type: String, require: true, default: 'Машинное обучение и технологии больших данных'},
                    value: {type: Number, require: true, default: 0}
                },
                magdet3_2:{
                    name: {type: String, require: true, default: 'Эгродизайн пользовательского интерфейса'},
                    value: {type: Number, require: true, default: 0}
                }
            },
            mag27_04_03:{ 
                name: {type: String, require: true, default: '27.04.03'},
                value: {type: Number, require: true, default: 0}
            },
        }
    ]
})

module.exports = model('Question', schema_u);