import { Fragment } from "react";
import { BsPlayCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { OtherMoreHome } from "~/layouts/LayoutHome";
import { ArtistAPIType } from "~/types";

function FourItemHome(props: { data?: unknown | undefined; row?: number }) {
  const { data, row } = props;
  if (!data) {
    return <></>;
  }

  const item = data as {
    title: string;
    items: any[];
  };

  return (
    <>
      <div className="mt-9">
        <div className="font-bold text-2xl">{item.title}</div>
        <br />
        <div className="grid grid-cols-4 gap-4">
          {item.items
            ?.slice(0, 4 * (row ?? item.items.length))
            .map((child, index) => (
              <Fragment key={index}>
                <div>
                  <Link className="relative group" to="/">
                    <div className="absolute z-20 w-full h-full rounded-lg hidden group-hover:flex items-center gap-3 justify-center group-hover:bg-black group-hover:bg-opacity-50">
                      <OtherMoreHome position="top-0 left-12" item={data}>
                        <BsPlayCircle size={40} />
                      </OtherMoreHome>
                    </div>
                    <img
                      className="rounded-lg"
                      src={child.thumbnailM}
                      alt="Error"
                    />
                  </Link>
                  {child?.uid != undefined ? (
                    <>
                      <FourItemExtend
                        title={child.title}
                        data={child.artists}
                      />
                    </>
                  ) : (
                    <>
                      <div className="line-clamp-2 text-gray-300">
                        {child.sortDescription}
                      </div>
                    </>
                  )}
                </div>
              </Fragment>
            ))}
        </div>
      </div>
    </>
  );
}

function FourItemExtend(props: { title: string; data: any }) {
  const { title, data } = props;
  const item = data as ArtistAPIType[];

  return (
    <>
      <div className="line-clamp-1 font-semibold">{title}</div>
      <div className="text-sm line-clamp-2 text-gray-300">
        {item.map(({ name }) => name).join(", ")}
      </div>
    </>
  );
}

export default FourItemHome;
