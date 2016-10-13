
var my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четчерг, четвертого числа...',
        bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
    },
    {
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!',
        bigText: 'А евро 42!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
        bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
    }
];

var Article = React.createClass({
    propTypes: {
        data: React.PropTypes.shape({
        author: React.PropTypes.string.isRequired,
        text: React.PropTypes.string.isRequired,
        bigText: React.PropTypes.string.isRequired
    })
},
getInitialState: function() {
    return {
        visible: false
    };
},
readmoreClick: function(e) {
    e.preventDefault();
    this.setState({visible: true});
},

render: function() {
    var author = this.props.data.author,
        text = this.props.data.text,
        bigText = this.props.data.bigText,
        visible = this.state.visible;


    return (
        <div className='article'>
            <p className='news__author'>{author}:</p>
            <p className='news__text'>{text}</p>

            {/* для ссылки readmore: не показывай ссылку, если visible === true */}
            <a href="#"
            onClick={this.readmoreClick}
            className={'news__readmore ' + (visible ? 'none': '')}>
            Подробнее
            </a>

            {/* для большо текста: не показывай текст, если visible === false */}
            <p className={'news__big-text ' + (visible ? '': 'none')}>{bigText}</p>

        </div>
    )}
});

var News = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    getInitialState: function() {
        return {
            counter: 0
        }
    },

    render: function() {
		var data = this.props.data;
		var newsTemplate;
        if (data.length > 0) {
            newsTemplate = data.map(function(item, index) {
                return (
                    <div key={index}>
                        <Article data={item} />
                    </div>
                    )
            })
        } else {
            newsTemplate = <p>К сожалению новостей нет</p>
        }


		return (
			<div className="news">
				{newsTemplate}
				<strong className={data.length > 0 ? '':'none'}>
                Всего новостей: {data.length}</strong>
			</div>
		);
	}
});

var TestInput = React.createClass({
    getInitialState: function() {
        return {
            myValue: ''
        };
    },
    onChangeHandler: function(e) {
        this.setState({myValue: e.target.value})
    },
    onBtnClickHandler: function() {
        alert(this.state.myValue);
    },
    render: function() {
        return (
            <div>
                <input className='test-input'
                value={this.state.myValue}
                onChange={this.onChangeHandler}
                placeholder='введите значение' />
                <button onClick={this.onBtnClickHandler}>Показать alert</button>
            </div>
        );
    }
});


//
//var Comments = React.createClass({
//	render: function() {
//		return (
//			<div className="news">
//				Нет новостей - комментировать нечего!
//			</div>
//		);
//	}
//});

var App = React.createClass({
	render: function() {
		return (
			<div className="app">
                <h3>Новости</h3>
                <TestInput />
				<News data={my_news} /> {/*добавили свойство data */}
			</div>
		);
	}
});

ReactDOM.render(
<App />,
document.getElementById('root')
);