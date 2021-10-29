const {model, Schema} = require('mongoose')

const schema_u = new Schema({
    content:{type: String, required: true, unique: true},
    lvl: {type: Number, required: true},
    isEnd: {type: Boolean, required: true},
    answers: [
        {
            content: {type: String, required: true}, 
            next_question_id: {type: String, required: true, default: '0'}, 
            value_1: {
                code_name: {type: String, required: true, default:'01.04.02_1'},
                name: {type: String, required: true, default:'Математическое моделирование в инженерных науках'},
                num: {type: Number, require: true, default: 0}
            },
            value_2: {
                code_name: {type: String, required: true, default:'01.04.02_2'},
                name: {type: String, required: true, default:'Прикладная математика для высокопроизводительных вычислительных систем'},
                num: {type: Number, require: true, default: 0}
            },
            value_3: {
                code_name: {type: String, required: true, default:'09.04.01_1'},
                name: {type: String, required: true, default:'Высокопроизводительные вычислительные системы и квантовая обработка информации'},
                num: {type: Number, require: true, default: 0}
            },
            value_4: {
                code_name: {type: String, required: true, default:'09.04.01_2'},
                name: {type: String, required: true, default:'Интеллектуальные системы'},
                num: {type: Number, require: true, default: 0}
            },
            value_5: {
                code_name: {type: String, required: true, default:'09.04.01_3'},
                name: {type: String, required: true, default:'Информационное и программное обеспечение автоматизированных систем'},
                num: {type: Number, require: true, default: 0}
            },
            value_6: {
                code_name: {type: String, required: true, default:'09.04.01_4'},
                name: {type: String, required: true, default:'Разработка информационных систем и web-приложений'},
                num: {type: Number, require: true, default: 0}
            },
            value_7: {
                code_name: {type: String, required: true, default:'09.04.01_5'},
                name: {type: String, required: true, default:'Системная интеграция и управление бизнес-процессами'},
                num: {type: Number, require: true, default: 0}
            },
            value_8: {
                code_name: {type: String, required: true, default:'09.04.01_6'},
                name: {type: String, required: true, default:'IT-management'},
                num: {type: Number, require: true, default: 0}
            },
            value_9: {
                code_name: {type: String, required: true, default:'09.04.03_1'},
                name: {type: String, required: true, default:'Машинное обучение и технологии больших данных'},
                num: {type: Number, require: true, default: 0}
            },
            value_10: {
                code_name: {type: String, required: true, default:'09.04.03_2'},
                name: {type: String, required: true, default:'Эгродизайн пользовательского интерфейса'},
                num: {type: Number, require: true, default: 0}
            },
            value_11: {
                code_name: {type: String, required: true, default:'09.04.04_1'},
                name: {type: String, required: true, default:'Методы и средства разработки программного обеспечения'},
                num: {type: Number, require: true, default: 0}
            },
            value_12: {
                code_name: {type: String, required: true, default:'27.04.03_1'},
                name: {type: String, required: true, default:'Управление киберфизическими системами'},
                num: {type: Number, require: true, default: 0}
            },
            value_13: {
                code_name: {type: String, required: true, default:'09.04.01_5'},
                name: {type: String, required: true, default:'Психотехнологии интеллектуально-личностного развития человека'},
                num: {type: Number, require: true, default: 0}
            },
        }
    ]
})

module.exports = model('Question', schema_u);