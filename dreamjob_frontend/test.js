const { Component } = React;
const { render } = ReactDOM;

class CanvasAnimation extends Component {
  state = {
    data: []
  };

  loadData() {
    function animation(json) {
      return json.map(function(data) {
        return (
          new CanvasSprite(
            document.getElementById(data.id),
            data.width,
            data.height,
            data.spriteSheetURL,
            data.rows,
            data.columns,
            data.totalFrames
          )
        );
      });
    }
    fetch("data.json")
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          data: json,
          animation: animation(json)
        });
      });
  }

  componentDidMount() {
    this.loadData();
  }

  handleInteraction(e) {
    var offsetY = e.clientY - e.node.getBoundingClientRect().top;
    var relY = offsetY/this.state.data.height;
    this.props.animation.setFrame(relY);
  }

  render() {
    var canvases = this.state.data.map(function(data) {
      return (
        <canvas
          id={data.id}
          width={data.width}
          height={data.height}
          style={{border: '5px white'}}
          onMouseOver={this.handleInteraction}
        />
      );
    });

    return (
      <div>{canvases}</div>
    );
  }
}

render(
  <CanvasAnimation />,
  content
);
