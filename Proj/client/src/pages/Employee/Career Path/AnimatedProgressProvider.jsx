import React from "react";
import { Animate } from "react-move";

// Component that animates the progress of the career path
class AnimatedProgressProvider extends React.Component {
    interval = undefined;

    state = {
        isAnimated: false
    };

    static defaultProps = {
        valueStart: 0
    };

    // Start the animation
    componentDidMount() {
        if (this.props.repeat) {
            this.interval = window.setInterval(() => {
                this.setState({
                    isAnimated: !this.state.isAnimated
                });
            }, this.props.duration * 1000);
        } else {
            this.setState({
                isAnimated: !this.state.isAnimated
            });
        }
    }

    // Stop the animation
    componentWillUnmount() {
        window.clearInterval(this.interval);
    }

    // Render the component. The value is passed to the children component
    render() {
        return (
            <Animate
                start={() => ({
                    value: this.props.valueStart
                })}
                update={() => ({
                    value: [
                        this.state.isAnimated ? this.props.valueEnd : this.props.valueStart
                    ],
                    timing: {
                        duration: this.props.duration * 1000,
                        ease: this.props.easingFunction
                    }
                })}
            >
                {({ value }) => this.props.children(value)}
            </Animate>
        );
    }
}

export default AnimatedProgressProvider;
