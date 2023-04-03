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
  const item = items[0];
  return (
    <>
      <div className="relative">
        <div className="absolute"></div>
        <div className="flex justify-between">
          <BannerItem item={item} />
          <BannerItem item={item} />
          <BannerItem item={item} />
        </div>
      </div>
    </>
  );
}

function BannerItem(props: { item: BannerItemType }) {
  const { item } = props;

  return (
    <>
      <img
        className="rounded-lg w-72 center-crop"
        src={item.banner}
        alt="Error"
      />
    </>
  );
}

export default BannerHome;
