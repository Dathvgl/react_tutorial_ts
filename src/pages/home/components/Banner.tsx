import { Fragment } from "react";
import Slider from "react-slick";

type BannerType = {
  sectionId: string;
  sectionTyoe: string;
  title: string;
  link: string;
  viewType: string;
  items: BannerItemType[];
};

type BannerItemType = {
  ispr: number;
  type: number;
  title: string;
  target: string;
  link: string;
  encodeId: string;
  cover: string;
  banner: string;
  description: string;
};

function BannerHome(props: { data?: unknown | undefined }) {
  const { data } = props;
  if (!data) {
    return <></>;
  }

  const { items } = data as BannerType;

  return (
    <>
      <div className="grid grid-cols-1">
        <Slider infinite centerMode speed={500} slidesToShow={3} slidesToScroll={1}>
          {items.map((item, index) => (
            <Fragment key={index}>
              <BannerItem item={item} />
            </Fragment>
          ))}
        </Slider>
      </div>
    </>
  );
}

function BannerItem(props: { item: BannerItemType }) {
  const { item } = props;

  return (
    <>
      <img
        className="rounded-lg w-60 center-crop"
        src={item.banner}
        alt="Error"
      />
    </>
  );
}

export default BannerHome;
