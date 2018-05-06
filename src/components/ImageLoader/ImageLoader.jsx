import React, { Component } from "react";
import PropTypes from "prop-types";

const Status = {
  PENDING: "pending",
  LOADING: "loading",
  LOADED: "loaded",
  FAILED: "failed"
};
class ImageLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.src ? Status.LOADING : Status.PENDING
    };
    this.createLoader = this.createLoader.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleError = this.handleError.bind(this);
  }
  componentDidMount() {
    if (this.state.status === Status.LOADING) {
      this.createLoader();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.setState({
        status: nextProps.src ? Status.LOADING : Status.PENDING
      });
    }
  }
  componentDidUpdate() {
    if (this.state.status === Status.LOADING) {
      this.createLoader();
    }
  }
  componentWillUnmount() {
    this.destroyLoader();
  }
  createLoader() {
    this.destroyLoader();
    this.img = new Image();
    this.img.onload = this.handleLoad;
    this.img.onerror = this.handleError;
    this.img.src = this.props.src;
  }
  destroyLoader() {
    if (this.img) {
      this.img.onload = null;
      this.img.onerror = null;
      this.img = null;
    }
  }
  handleLoad(event) {
    const { onLoad } = this.props;
    this.destroyLoader();
    this.setState({ status: Status.LOADED });
    if (onLoad) {
      onLoad(event);
    }
  }
  handleError(error) {
    const { onError } = this.props;
    this.destroyLoader();
    this.setState({ status: Status.FAILED });
    if (onError) {
      onError(error);
    }
  }
  render() {
    const {
      className,
      style,
      unloadedSrc,
      alt,
      src,
      children,
      preloader
    } = this.props;
    const { status } = this.state;
    switch (status) {
      case Status.LOADED:
        return <img className={className} style={style} src={src} alt={alt} />;

      case Status.FAILED:
        if (children) {
          return this.props.children;
        }
        return (
          <img
            className={className}
            style={style}
            src={unloadedSrc}
            alt={alt}
          />
        );
      default:
        if (preloader) {
          return preloader();
        }
        return <div>Loading Images</div>;
    }
  }
}
ImageLoader.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  style: PropTypes.object,
  unloadedSrc: PropTypes.string,
  onError: PropTypes.func,
  onLoad: PropTypes.func
};
ImageLoader.defaultProps = {
  className: "",
  alt: "",
  src: "",
  style: {},
  unloadedSrc: "",
  onError: () => {},
  onLoad: () => {}
};
export default ImageLoader;
