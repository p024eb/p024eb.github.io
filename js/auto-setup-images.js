// Auto Setup Images version 0.2.0 ///////////////

(function () {
  function autoSetupImages(
    targetClass,
    set_img_list,
    set_device_list,
    set_images_folder
  ) {
    targetEl = targetClass;

    // for Menus
    // tabMenusWrapEL = targetEl.querySelector(".tabMenuWrap");
    // tabMenuItemListEL = tabMenusWrapEL.querySelectorAll(".tabMenuItem");

    // for Images
    tabContWrapEL = targetEl.querySelector(".tabContentsWrap");
    tabContListEL = tabContWrapEL.querySelectorAll(".tabContents");

    for (let i = 0; i < set_device_list.length; i++) {
      // set menu text
      // tabMenuItemListEL[i].textContent = set_device_list[i];

      const divContWrapEl = tabContListEL[i].querySelector(".contentsWrap");

      // Output images
      for (let j = 0; j < set_img_list.length; j++) {
        const divContItemEl = document.createElement("div");
        divContItemEl.className = "contentsItem article";
        divContWrapEl.appendChild(divContItemEl);

        const divImageWrapEl = document.createElement("div");
        divImageWrapEl.className = "articleImageWrap";
        divContItemEl.appendChild(divImageWrapEl);

        const divImageEl = document.createElement("img");
        divImageEl.className = "articleImage";

        // Image Path Sample
        // "./images/LM-dammy16/AT2/6900_14304_9900_17827.png"
        // "set_images_folder/set_device_list[i]/set_img_list[j]"
        divImageEl.src =
          set_images_folder + set_device_list[i] + "/" + set_img_list[j];
        // set alt text
        divImageEl.alt = set_device_list[i] + "-image-" + j;
        divImageWrapEl.appendChild(divImageEl);
      }
    }
  }

  function checkDim(list) {
    dim = -1;
    if (list === null) return dim;
    dim = 0;
    while (Object.prototype.toString.call(list) === "[object Array]") {
      dim++;
      list = list[0];
    }
    return dim;
  }

  // Setting & Run
  const targetClassList = document.querySelectorAll(".autoSetupImages");
  if (
    targetClassList.length !== 0 &&
    typeof target_img_list !== "undefined" &&
    target_img_list.length !== 0 &&
    typeof target_device_list !== "undefined" &&
    target_device_list.length !== 0 &&
    typeof target_images_folder !== "undefined" &&
    target_images_folder.length !== 0
  ) {
    let input_img_list = [];
    let input_device_list = [];
    let input_images_folder = [];

    if (checkDim(target_img_list) < 2) {
      input_img_list.push(target_img_list);
    } else {
      input_img_list = target_img_list;
    }
    if (checkDim(target_device_list) < 2) {
      input_device_list.push(target_device_list);
    } else {
      input_device_list = target_device_list;
    }
    if (checkDim(target_images_folder) < 1) {
      input_images_folder.push(target_images_folder);
    } else {
      input_images_folder = target_images_folder;
    }

    const targetDataSet = [
      targetClassList.length,
      input_img_list.length,
      input_device_list.length,
      input_images_folder.length,
    ];

    if (targetDataSet.every((val) => val === targetDataSet[0])) {
      for (let i = 0; i < targetClassList.length; ++i) {
        autoSetupImages(
          targetClassList[i],
          input_img_list[i],
          input_device_list[i],
          input_images_folder[i]
        );
      }
    } else {
      console.log("data mismatch");
    }
  } else {
    console.log("autoSetupImages target is None");
  }
})();
