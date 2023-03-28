import { AiOutlineHeart, AiOutlineStepBackward, AiOutlineStepForward } from "react-icons/ai";
import { BsPlayCircle, BsRepeat, BsRepeat1, BsThreeDots } from "react-icons/bs";
import { FaRandom } from "react-icons/fa";
import { RiPlayListLine, RiVolumeMuteFill, RiVolumeUpFill } from "react-icons/ri";
import Brh from "~/components/Brh";
import { HoverCircleIcon } from "~/components/Icon";

function FooterHome() {
  return (
    <>
      <div className="h-20 p-4 text-white bg-slate-800 flex justify-between items-center">
        <div className="flex justify-between items-center">
          <img src="" alt="Error" />
          <Brh />
          <div>
            <div>Name</div>
            <div>Author</div>
          </div>
          <Brh />
          <HoverCircleIcon>
            <AiOutlineHeart size={20} />
          </HoverCircleIcon>
          <Brh />
          <HoverCircleIcon>
            <BsThreeDots size={20} />
          </HoverCircleIcon>
        </div>
        <div>
          <div className="flex items-center">
            <HoverCircleIcon>
              <FaRandom size={20} />
            </HoverCircleIcon>
            <Brh />
            <HoverCircleIcon>
              <AiOutlineStepBackward size={20} />
            </HoverCircleIcon>
            <Brh />
            <BsPlayCircle size={30} />
            {/* <BsPauseCircle size={30} /> */}
            <Brh />
            <HoverCircleIcon>
              <AiOutlineStepForward size={20} />
            </HoverCircleIcon>
            <Brh />
            <HoverCircleIcon>
              <BsRepeat size={20} />
            </HoverCircleIcon>
            <Brh />
            <HoverCircleIcon>
              <BsRepeat1 size={20} />
            </HoverCircleIcon>
          </div>
          <div></div>
        </div>
        <div className="flex justify-between items-center">
          <HoverCircleIcon>
            <RiVolumeMuteFill size={20} />
          </HoverCircleIcon>
          <Brh />
          <HoverCircleIcon>
            <RiVolumeUpFill size={20} />
          </HoverCircleIcon>
          <Brh />
          <HoverCircleIcon>
            <RiPlayListLine size={20} />
          </HoverCircleIcon>
        </div>
      </div>
    </>
  );
}

export default FooterHome;
