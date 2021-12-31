import React, { Component } from "react";
import moment from 'moment-timezone';
import config from "./config.js";
 
class Room extends Component {
    componentDidMount() {
        function createFrameAndJoinRoom(room) {
            let roomName = "meet-" + room;
            window.callFrame = window.DailyIframe.createFrame(
                document.getElementById("frame"), {
                showLeaveButton: true,
                showFullscreenButton: true,
                iframeStyle: {
                    position: 'relative',
                    top: "-32px",
                    bottom: "2%",
                    left: 0,
                    width: '100%',
                    height: '100%',
                }
            });
            
            console.log("Joining " + roomName);
            console.log("https://" + config.DAILY_SUBDOMAIN + ".daily.co/" + roomName);
            window.callFrame.join({ url: "https://" + config.DAILY_SUBDOMAIN + ".daily.co/" + roomName })
        }

        let timerElt = document.getElementById("date");
          
        window.timerId = setInterval(() => {
          timerElt.innerText = currentDatetime();
        }, 1);

        createFrameAndJoinRoom("lici");
        // createFrameAndJoinRoom(window.location.pathname.replace("/", ""));
    }

    render() {
        const roomName = this.props.name.toUpperCase();
        const roomConfig = config.rooms[roomName];

        const defaultTitle = "Lici Meet, room = "+ roomName;
        // const defaultBackground = "logo.png";

        const title = roomConfig && roomConfig.TITLE ? roomConfig.TITLE : defaultTitle;
        // const background = roomConfig && roomConfig.BACKGROUND ? roomConfig.BACKGROUND : defaultBackground;

        let frameStyle = {
            backgroundColor: "white"
            // backgroundImage: "url(" + config.ASSET_PATH + "/" + background + ")"
        }

        const headerStyle = roomConfig && roomConfig.HEADER ? {
            backgroundImage: "url(" + config.ASSET_PATH + "/" + roomConfig.HEADER + ")",
        } : {}

        console.log(roomConfig);

        return (
          <div className="room">
            <div className="header" style={headerStyle}>
              <h2 className="title">{title}</h2>
              <a
                href={config.COMPANY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <img
                  alt={config.COMPANY_NAME}
                  className="logo-header"
                  src={config.ASSET_PATH + "/logo-header.png"}
                ></img> */}
              </a>
            </div>
            <div id="frame" style={frameStyle}></div>
            <div className="footer">
              <div className="date" id="date"></div>
              <div className="plug">
                <span className="made">
                  <a
                    href={config.COMPANY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Lici Meet
                  </a>
                </span>
              </div>
            </div>
          </div>
        );
    };
}

function currentDatetime() {
    let date = new Date();
    let zoneName = moment.tz.guess();
    let time = moment(date).format("h:mma z");
    let day = moment(date).format(" | MMMM DD, YYYY");
    let zone = moment().tz(zoneName).format("z");
    return  [time, zone, day].join(" ");
}

export default Room;