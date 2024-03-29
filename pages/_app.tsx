import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'

// redux
import { Provider } from 'react-redux'
import { store } from 'redux-tk/store'

import '@avsync.live/formation/dist/index.dark.css'
import 'react-bubble-ui/dist/index.css';

import '../styles/globals.css'

// fontawesome
import '@fortawesome/fontawesome-svg-core/styles.css'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import * as far from '@fortawesome/free-regular-svg-icons'
import * as fas from '@fortawesome/free-solid-svg-icons'
import * as fab from '@fortawesome/free-brands-svg-icons'
library.add(
  // regular
  // @ts-ignore
  far.faHeart, far.faPaperPlane, far.faCheckSquare, far.faSquare,
  fas.faEnvelope, far.faCopy, far.faClock, far.faBookmark, far.faEdit,
  far.faEnvelope, far.faMessage, 

  fab.faYoutube, fab.faGithubAlt,
  
  // solid
  fas.faInfoCircle, fas.faBars, fas.faHeart, fas.faPlus,
  fas.faEllipsisV, fas.faPaperPlane, fas.faCalendarAlt,
  fas.faArrowRight, fas.faArrowLeft, fas.faClock, fas.faSearch,
  fas.faSortAlphaUp, fas.faSortAlphaDown, fas.faFilter,
  fas.faChevronCircleRight, fas.faChevronCircleLeft, fas.faEnvelope,
  fas.faCheck, fas.faExclamationTriangle, fas.faUser, fas.faComment,
  fas.faComments, fas.faMessage, fas.faComments, fas.faBook, 
  fas.faQuestionCircle, fas.faNewspaper, fas.faInfo, fas.faQuestion,
  fas.faLightbulb, fas.faFolder, fas.faCopy, fas.faBookmark, fas.faShare,
  fas.faDownload, fas.faFileDownload, fas.faRefresh, fas.faSync, fas.faSyncAlt,
  fas.faPlay, fas.faMicrophone, fas.faMicrophoneSlash, fas.faStop, fas.faFingerprint,
  fas.faBrain, fas.faPuzzlePiece, fas.faCompass, fas.faGraduationCap,
  fas.faBullseye, fas.faComments, fas.faMousePointer, fas.faMasksTheater,
  fas.faBalanceScale, fas.faTag, fas.faTrafficLight, fas.faFlask, fas.faDna,
  fas.faScroll, fas.faTimes, fas.faCubes, fas.faUsersLine,
  fas.faPeopleArrows, fas.faShieldHalved, fas.faMask,
  fas.faArrowsSplitUpAndLeft, fas.faArrowsSpin, fas.faCog,
  fas.faDiagramProject, fas.faList, fas.faBookmark, fas.faSignOut,
  fas.faGlobe, fas.faEye, fas.faEyeSlash, fas.faPanorama, fas.faA, fas.faI,
  fas.faCircleNodes, fas.faDiagramProject, fas.faEye, fas.faDatabase,
  fas.faChess, fas.faHandshakeSimple, fas.faGlobe, fas.faPaintBrush,
  fas.faArrowUpRightDots, fas.faEarthAfrica, fas.faChessQueen, fas.faPalette,
  fas.faShapes, fas.faDoorOpen, fas.faMap, fas.faSitemap, fas.faP, fas.faT, fas.faUsers,
  fas.faCheckSquare, fas.faFilm, fas.faVolumeHigh, fas.faLink, fas.faHouse, fas.faBell,
  fas.faWrench, fas.faEdit, fas.faTrashAlt, fas.faArrowUp, fas.faSave, fas.faBan, 
  fas.faPencil, fas.faPencilAlt, fas.faImage, fas.faVideo, fas.faMusic, fas.faFile,
  fas.faCode, fas.faEnvelope, fas.faParagraph, fas.faBoltLightning, fas.faChevronLeft,
  fas.faChevronDown, fas.faChevronRight, fas.faHashtag, fas.faCaretRight, fas.faCaretDown,
  fas.faDiagramProject, fas.faUserCircle, fas.faEllipsisH, fas.faLock, fas.faLockOpen,
  fas.faCircleDot, fas.faGripLines, fas.faEllipsisH, fas.faComments, fas.faMinimize,
  fas.faReply, fas.faChevronUp, fas.faGripHorizontal, fas.faUpRightFromSquare,
  fas.faTriangleExclamation, fas.faMagnifyingGlassMinus, fas.faMagnifyingGlassPlus,
  fas.faTextHeight, fas.faTextWidth, fas.faAlignLeft, fas.faAlignJustify, fas.faFont,
  fas.faMinus, fas.faArrowsUpDown, fas.faArrowsLeftRight, fas.faMagicWandSparkles,
  fas.faArrowDown
)

import { useRouter } from 'next/router'
import { Linker, Ripple } from '@avsync.live/formation'

import dynamic from 'next/dynamic'
import MyLink from 'components/Link'
import ProgressBar from 'components/ProgressBar'
import { Search } from 'components/Search/Search'

const App = dynamic(() => import('../components/App'), {
  ssr: false,
});

const SpacesDashboard = dynamic(() => import('../components/SpacesDashboard'), {
  ssr: false,
});

config.autoAddCss = false

const MyApp = React.memo(({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  const Content = () => {
    switch(router.route) {
      case '/login':
      case '/search':
      case '/':
      case '/spaces':
        return <SpacesDashboard />
      default:
        return <App>
          <Component {...pageProps} />
        </App>
    }
  }

  return <>
    <Head>
      <title>Harmony</title>
      <meta name="description" content="Let's work together on whatever you care about." />
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:title" content="Harmony" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <meta name="theme-color" content="#000000" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Harmony" />
      <meta property="og:image" content="harmony-social-share.png"></meta>
      <meta
        property="og:description"
        content="Let's work together on whatever you care about."
      />
      <meta property="og:site_name" content="Harmony" />
    </Head>
    <Provider store={store}>
      <Linker CustomLink={MyLink}> 
        <Content />
        <ProgressBar />
      </Linker> 
    </Provider>
  </>
})

export default MyApp