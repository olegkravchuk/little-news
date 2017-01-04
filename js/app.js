window.ee = new EventEmitter();

var news = [
    {   id: 0,
        author: 'Author1',
        text: 'Text1...',
        bigText: 'Big Text1'
    },
    {   id: 1,
        author: 'Author2',
        text: 'Text2...',
        bigText: 'Big Text2'
    },
    {   id: 2,
        author: 'Author3',
        text: 'Text3',
        bigText: 'Big Text3'
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
    getInitialState: function(){
      return {
          visible: false
      }
    },
    readmoreClick: function(e){
      e.preventDefault();
        this.setState({
            visible: true
        })
    },
    render: function(){
        return (
            <div className="article">
                <p className="author">{this.props.data.author}:</p>
                <p className="text">{this.props.data.text}</p>
                <a href="#" onClick={this.readmoreClick} className={'readmore ' + (this.state.visible ? 'none':'')}>Detail</a>
                <p className={'big-text ' + (this.state.visible ? '':'none')}>{this.props.data.bigText}</p>
            </div>
        )
    }
});

var News = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    getInitialState: function(){
      return {
          counter: 0
      }
    },
    render: function(){
        var newsTemplate;
        if(this.props.data.length) {
            newsTemplate = this.props.data.map(function (item) {
                return (
                    <div key={item.id}>
                        <Article data={item}/>
                    </div>
                )
            });
        } else {
            newsTemplate = <p>Not news</p>
        }

        return (
            <div className="news">
                {newsTemplate}
                <strong className={ 'count ' + (this.props.data.length > 0 ? '':'none')}>Total news: {this.props.data.length}</strong>
            </div>
        )
    }
});

var Comments = React.createClass({
    render: function(){
        return (
            <div className="comments">
                Comments component
            </div>
        )
    }
});

var AddNew = React.createClass({
    componentDidMount: function(){
        ReactDOM.findDOMNode(this.refs.author).focus();
    },
    getInitialState: function(){
        return {
            agreeNotChecked: true,
            authorIsEmpty: true,
            textIsEmpty: true
        }
    },
    //onChangeHandler: function(e){
    //    this.setState({
    //        myValue: e.target.value
    //    })
    //},
    onBtnClickHandler: function(e){
        //  alert(this.state.myValue)
        //  console.log(this.refs);
        e.preventDefault();
        var item = [{
            id: Math.floor((Math.random() * 1000000) + 1),
            author: ReactDOM.findDOMNode(this.refs.author).value,
            text: ReactDOM.findDOMNode(this.refs.text).value,
            bigText: '...'
        }];
        window.ee.emit('News.add', item);
        ReactDOM.findDOMNode(this.refs.text).value = '';
        this.setState({
            textIsEmpty: true
        });
    },
    onCheckRuleClick: function(e){
        //ReactDOM.findDOMNode(this.refs.alert_button).disabled = !e.target.checked;
        this.setState({
            agreeNotChecked: !this.state.agreeNotChecked
        })
    },
    fieldChange: function(fieldName, e){
        var next = {};
        next[fieldName] = !e.target.value.trim().length > 0;
        this.setState(next);
    },
    render: function(){
        return (
            <form className='add cf'>
                {/*<input type="text" className='test-input' onChange={this.onChangeHandler} value={this.state.myValue} placeholder='Input text'/>*/}
                <input type='text' className='add-author' defaultValue='' placeholder='Author' ref='author' onChange={this.fieldChange.bind(this, 'authorIsEmpty')}/>
                <textarea className='add-text' defaultValue='' placeholder='Text New' ref='text' onChange={this.fieldChange.bind(this, 'textIsEmpty')}></textarea>
                <label className='add-checkrule'>
                    <input type='checkbox' ref='checkrule' onChange={this.onCheckRuleClick}/>I agree
                </label>
                <button className='add-btn' onClick={this.onBtnClickHandler} ref='alert_button' disabled={this.state.agreeNotChecked || this.state.authorIsEmpty || this.state.textIsEmpty}>Alert Value</button>
            </form>
        )
    }
});

var App = React.createClass({
    getInitialState: function(){
        return {
            news: news
        }
    },
    componentDidMount: function() {
        var self = this;
        window.ee.addListener('News.add', function(item){
            var nextNews = item.concat(self.state.news);
            self.setState({
                news: nextNews
            })
        })
    },
    componentWillUnmount: function() {
        window.ee.removeListener('News.add');
    },
    render: function () {
        return (
            <div className="app">
                <AddNew />
                <h3>News</h3>
                <News data={this.state.news}/>
                <Comments />
            </div>
        )
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);