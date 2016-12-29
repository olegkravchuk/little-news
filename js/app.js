var photos = ['images/cat.jpg','images/dog.jpg','images/owl.jpg'];

var news = [
    {
        author: 'Author1',
        text: 'Text1...'
    },
    {
        author: 'Author2',
        text: 'Text2...'
    },
    {
        author: 'Author3',
        text: 'Text3'
    }
];

var News = React.createClass({
    render: function(){
        var newsTemplate = this.props.data.map(function(item, index){
            return (
                <div key={index}>
                    <p className="author">{item.author}:</p>
                    <p className="text">{item.text}</p>
                </div>
            )
        });

        return (
            <div className="news">
                {newsTemplate}
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

var App = React.createClass({
   render: function(){
       return (
           <div className="app">
               Component App!!!
               <News data={news}/>
               <Comments />
           </div>
       )
   }
});

ReactDOM.render(
    <App />,
    //    <Photos photos=photos />
    //    <LastNews />
    //    <Comments />
    //</App>,
    document.getElementById('root')
);