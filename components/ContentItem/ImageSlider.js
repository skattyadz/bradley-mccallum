import Image from '~/components/Image';
import Container from '~/components/Container';
import Carousel from '~/components/Carousel';
import Caption from '~/components/Caption';
import { CONTENT_ITEM_SPACING } from '~/lib/theme';

export default class ImageSlider extends React.Component {
  state = { selectedIndex: 0 };

  handleIndexChange = (id, item) => {
    this.setState({ selectedIndex: id });
  };

  render() {
    const items = this.props.item.items.filter(({ image }) => image.url);
    const { selectedIndex } = this.state;

    if (!items.length) {
      return null;
    }
    return (
      <Container>
        <div className="root">
          <Carousel
            onChange={this.handleIndexChange}
            selectedIndex={selectedIndex}
          >
            {items.map(({ image }) => <Image key={image.url} image={image} />)}
          </Carousel>

          <Caption>{items[selectedIndex].caption}</Caption>
        </div>

        <style jsx>{`
          .root {
            margin-bottom: ${CONTENT_ITEM_SPACING};
          }
        `}</style>
      </Container>
    );
  }
}
