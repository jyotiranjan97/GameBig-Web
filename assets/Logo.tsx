import React, { FC } from 'react';

type Props = {
  size: number;
  onClick: () => void;
};

const Logo: FC<Props> = ({ size, onClick }: Props) => {
  return (
    <div onClick={onClick}>
      <svg
        width="144"
        height="31"
        viewBox="0 0 1444 310"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M55.ddd6 161.36C55.ddd6 171.152 57.9106 179.12 63.2866 185.264C68.8546 191.216 75.6706 194.192 83.7346 194.192C94.6786 194.192 104.471 189.008 113.111 178.64C116.375 161.552 120.599 134.576 125.783 97.712C104.279 97.712 87.0946 103.952 74.2306 116.432C61.5586 128.912 55.ddd6 143.888 55.ddd6 161.36ZM131.543 270.512C122.519 282.608 111.191 292.112 97.5586 299.024C83.9266 306.128 69.5266 309.68 54.3586 309.68C39.3826 309.68 27.2866 306.8 18.0706 301.04C9.04663 295.472 4.53463 287.888 4.53463 278.288C4.53463 268.688 8.47063 258.608 16.3426 248.048C25.1746 261.104 38.4226 267.632 56.0866 267.632C67.6066 267.632 78.2626 262.64 88.0546 252.656C98.0386 242.864 104.663 228.464 107.927 209.456L105.047 208.016C91.4146 227.984 73.9426 237.968 52.6306 237.968C36.5026 237.968 23.8306 231.728 14.6146 219.248C5.39863 206.768 0.790625 190.16 0.790625 169.424C0.790625 149.456 6.26263 131.216 17.2066 114.704C29.6866 95.696 47.0626 82.544 69.3346 75.248C81.6226 71.216 93.3346 69.2 104.471 69.2C115.607 69.2 125.015 69.968 132.695 71.504C133.847 76.688 134.519 81.392 134.711 85.616C143.735 79.472 152.855 76.4 162.071 76.4C175.319 76.4 181.943 83.216 181.943 96.848C181.943 110.48 181.079 124.496 179.351 138.896C177.623 153.104 174.935 168.368 171.287 184.688C167.639 201.008 162.359 216.464 155.447 231.056C148.727 245.456 140.759 258.608 131.543 270.512ZM319.179 206.576L316.299 205.136C311.115 218.96 303.627 229.808 293.835 237.68C284.235 245.36 273.483 249.2 261.579 249.2C245.259 249.2 232.203 243.056 ddd.411 230.768C212.619 218.48 207.723 202.064 207.723 181.52C207.723 149.648 218.379 122.96 239.691 101.456C261.195 79.952 287.883 69.2 319.755 69.2C328.011 69.2 335.595 69.968 342.507 71.504C343.659 76.88 344.331 81.584 344.523 85.616C354.123 79.472 364.011 76.4 374.187 76.4C388.203 76.4 395.211 83.984 395.211 99.152C395.211 104.528 392.139 120.752 385.995 147.824C380.043 174.896 377.067 194.96 377.067 208.016C377.067 221.072 380.043 230.096 385.995 235.088C375.243 244.496 364.011 249.2 352.299 249.2C340.779 249.2 332.331 245.744 326.955 238.832C321.771 231.92 319.179 221.168 319.179 206.576ZM261.867 167.408C261.867 176.816 263.787 184.112 267.627 189.296C271.659 194.288 277.323 196.784 284.619 196.784C291.915 196.784 299.115 194.096 306.219 188.72C313.323 183.344 319.275 175.952 324.075 166.544C325.803 147.152 329.547 124.208 335.307 97.712C315.915 97.712 298.827 104.72 284.043 118.736C269.259 132.752 261.867 148.976 261.867 167.408ZM607.85 120.464L610.73 121.904C631.274 86.768 656.426 69.2 686.186 69.2C709.418 69.2 721.034 80.816 721.034 104.048C721.034 114.032 718.154 130.928 712.394 154.736C706.826 178.544 704.042 196.496 704.042 208.592C704.042 220.688 706.058 229.52 710.09 235.088C699.914 244.496 689.162 249.2 677.834 249.2C655.754 249.2 644.714 237.296 644.714 213.488C644.714 204.656 647.594 189.68 653.354 168.56C659.114 147.44 661.994 133.712 661.994 127.376C661.994 118.736 658.73 114.416 652.202 114.416C646.826 114.416 640.778 116.816 634.058 121.616C627.53 126.224 621.194 132.56 615.05 140.624C609.098 148.496 604.01 158.576 599.786 170.864C595.754 182.96 593.738 195.344 593.738 208.016C593.738 220.496 595.754 229.52 599.786 235.088C589.61 244.496 578.858 249.2 567.53 249.2C545.45 249.2 534.41 237.296 534.41 213.488C534.41 204.656 537.29 189.68 543.05 168.56C548.81 147.44 551.69 133.712 551.69 127.376C551.69 118.736 548.426 114.416 541.898 114.416C536.522 114.416 530.474 116.816 523.754 121.616C517.226 126.224 510.89 132.56 504.746 140.624C498.794 148.496 493.706 158.576 489.482 170.864C485.45 182.96 483.434 195.344 483.434 208.016C483.434 220.496 485.45 229.52 489.482 235.088C479.306 244.496 468.554 249.2 457.226 249.2C435.146 249.2 424.106 237.296 424.106 213.488C424.106 205.808 426.026 190.928 429.866 168.848C433.898 146.768 438.026 126.608 442.25 108.368L427.274 85.328C446.282 74.576 463.85 69.2 479.978 69.2C496.106 69.2 504.17 76.496 504.17 91.088C504.17 100.688 501.962 110.48 497.546 120.464L500.426 121.904C520.97 86.768 546.122 69.2 575.882 69.2C586.634 69.2 595.082 71.888 601.226 77.264C607.562 82.64 610.73 90.704 610.73 101.456C610.73 107.216 609.77 113.552 607.85 120.464ZM829.281 249.2C802.977 249.2 782.625 242.384 768.225 228.752C754.017 215.12 746.913 196.688 746.913 173.456C746.913 142.544 757.473 117.488 778.593 98.288C799.905 78.896 826.593 69.2 858.657 69.2C876.513 69.2 890.049 73.232 899.265 81.296C908.481 89.168 913.089 99.632 913.089 112.688C913.089 130.544 904.353 145.424 886.881 157.328C869.601 169.04 842.817 174.992 806.529 175.184C807.105 187.472 809.889 197.168 814.881 204.272C819.873 211.184 826.113 214.64 833.601 214.64C841.089 214.64 847.521 212.144 852.897 207.152C858.465 202.16 861.249 194 861.249 182.672C889.281 182.672 903.297 189.296 903.297 202.544C903.297 213.872 896.385 224.528 882.561 234.512C868.737 244.304 850.977 249.2 829.281 249.2ZM853.761 102.896C843.969 102.896 834.945 107.792 826.689 117.584C818.625 127.376 812.769 138.896 809.121 152.144C828.321 150.608 842.721 146.288 852.321 139.184C862.113 131.888 867.009 124.208 867.009 116.144C867.009 112.304 865.761 109.136 863.265 106.64C860.961 104.144 857.793 102.896 853.761 102.896Z"
          fill="#555"
        />
        <path
          d="M942.242 187.28C942.242 171.152 948.482 129.68 960.962 62.864L944.834 39.824C956.738 32.72 966.722 27.44 974.786 23.984C983.042 20.528 991.202 18.8 999.266 18.8C1007.52 18.8 1013.57 20.432 1017.41 23.696C1021.25 26.96 1023.17 32.144 1023.17 39.248C1023.17 51.536 1019.43 75.632 1011.94 111.536L1014.82 112.976C1028.64 85.52 1048.8 71.792 1075.3 71.792C1090.27 71.792 1101.99 78.224 1110.43 91.088C1118.88 103.76 1123.11 119.216 1123.11 137.456C1123.11 155.504 1119.46 171.824 1112.16 186.416C1105.06 200.816 1095.75 212.528 1084.23 221.552C1072.9 230.384 1060.51 237.2 1047.07 242C1033.63 246.8 1020.29 249.2 1007.04 249.2C985.346 249.2 969.122 244.208 958.37 234.224C947.618 224.24 942.242 208.592 942.242 187.28ZM999.266 215.792C1020.58 215.792 1037.86 208.496 1051.11 193.904C1064.55 179.312 1071.27 162.992 1071.27 144.944C1071.27 136.688 1068.96 129.2 1064.35 122.48C1059.94 115.76 1054.08 112.4 1046.79 112.4C1039.49 112.4 1032.67 115.376 1026.34 121.328C1020.19 127.28 1015.39 134.384 1011.94 142.64C1008.67 150.896 1005.99 160.208 1003.87 170.576C1000.8 186.896 999.266 201.968 999.266 215.792ZM1245 23.696C1245 30.992 1241.16 37.328 1233.48 42.704C1225.8 47.888 1217.07 50.48 1207.28 50.48C1197.48 50.48 1189.71 48.56 1183.95 44.72C1178.38 40.88 1175.6 35.696 1175.6 29.168C1175.6 20.336 1179.72 13.424 1187.98 8.43199C1196.24 3.43999 1204.97 0.943996 1214.19 0.943996C1223.4 0.943996 1230.8 2.86399 1236.36 6.70399C1242.12 10.544 1245 16.208 1245 23.696ZM1188.84 249.2C1176.94 249.2 1168.3 246.224 1162.92 240.272C1157.55 234.32 1154.86 225.296 1154.86 213.2C1154.86 200.912 1161 168.176 1173.29 114.992L1157.16 90.8C1181.16 76.4 1200.08 69.2 1213.9 69.2C1221.77 69.2 1227.34 70.928 1230.6 74.384C1233.87 77.648 1235.5 83.024 1235.5 90.512C1235.5 93.392 1231.95 110.288 1224.84 141.2C1217.74 172.112 1214.19 194.192 1214.19 207.44C1214.19 220.688 1217.16 229.904 1223.12 235.088C1212.36 244.496 1200.94 249.2 1188.84 249.2ZM1316.63 161.36C1316.63 171.152 1319.32 179.12 1324.69 185.264C1330.26 191.216 1337.08 194.192 1345.14 194.192C1356.08 194.192 1365.88 189.008 1374.52 178.64C1377.78 161.552 1382 134.576 1387.19 97.712C1365.68 97.712 1348.5 103.952 1335.64 116.432C1322.96 128.912 1316.63 143.888 1316.63 161.36ZM1392.95 270.512C1383.92 282.608 1372.6 292.112 1358.96 299.024C1345.33 306.128 1330.93 309.68 1315.76 309.68C1300.79 309.68 1288.69 306.8 1279.48 301.04C1270.45 295.472 1265.94 287.888 1265.94 278.288C1265.94 268.688 1269.88 258.608 1277.75 248.048C1286.58 261.104 1299.83 267.632 1317.49 267.632C1329.01 267.632 1339.67 262.64 1349.46 252.656C1359.44 242.864 1366.07 228.464 1369.33 209.456L1366.45 208.016C1352.82 227.984 1335.35 237.968 1314.04 237.968C1297.91 237.968 1285.24 231.728 1276.02 219.248C1266.8 206.768 1262.2 190.16 1262.2 169.424C1262.2 149.456 1267.67 131.216 1278.61 114.704C1291.09 95.696 1308.47 82.544 1330.74 75.248C1343.03 71.216 1354.74 69.2 1365.88 69.2C1377.01 69.2 1386.42 69.968 1394.1 71.504C1395.25 76.688 1395.92 81.392 1396.12 85.616C1405.14 79.472 1414.26 76.4 1423.48 76.4C1436.72 76.4 1443.35 83.216 1443.35 96.848C1443.35 110.48 1442.48 124.496 1440.76 138.896C1439.03 153.104 1436.34 168.368 1432.69 184.688C1429.04 201.008 1423.76 216.464 1416.85 231.056C1410.13 245.456 1402.16 258.608 1392.95 270.512Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default Logo;
