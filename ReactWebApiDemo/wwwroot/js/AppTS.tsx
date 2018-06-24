import * as React from 'react'
import * as ReactRouter from 'react-router'
import {
    BrowserRouter as Router,
    Route,
    Link

} from 'react-router-dom'

const Home = () => (
    <div>
        <h2>Home TS</h2>
    </div>
);

const About = () => (
    <div>
        <h2>About TS</h2>
    </div>
);

const Topic = ({ match }: { match: ReactRouter.match<any> }) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
);

/*
const Topics = ({ match }: { match: ReactRouter.match<any> }) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>
                    Rendering with React
	            </Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>
                    Components
	            </Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>
                    Props v. State
	            </Link>
            </li>
        </ul>

        <Route path={`${match.path}/:topicId`} component={Topic} />
        <Route exact path={match.path} render={() => (
            <h3>Please select a topic.</h3>
        )} />
    </div>
);
*/
class Topics extends React.Component<any, { values: any[] }>{
    constructor(props: any) {
        super(props);
        console.log("Topics.ctor");
        this.state = { values: [] };
    }
    public componentDidMount() {
        console.log("componentDidMount");
        fetch("/api/values")
            .then((response) => {
                console.log(" got response " + response);
                return response.json();
            })
            .then((json) => {
                console.log("got json " + json);
                this.setState({ values: json });
            })
            ;

    }
    public render() {
        if (null === this.state) return null;
        return <div>
            <h2>Topics</h2>
            <ul>
                {this.state.values.map(function (value: any, index: number) {
                    return <li key={index}>{value}</li>;
                })}
            </ul>
        </div>
            ;
    }
}

const BasicExample = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/">Home TS</Link></li>
                <li><Link to="/about">About TS</Link></li>
                <li><Link to="/topics">Topics TS</Link></li>
            </ul>

            <hr />

            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/topics" component={Topics} />
        </div>
    </Router>
);

export default BasicExample