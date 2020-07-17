import JSX from '@nyaf/lib'
import './hero.scss';

const Hero = ({as: Element = "div", cls = "", className = "", children}) => {
    return (
        <Element className={'hero ' + cls}>
            {children}
        </Element>
    )
};

export default Hero;

