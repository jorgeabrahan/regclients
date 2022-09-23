const createClientOption = (name: string, ID: string) => {
    const option = document.createElement("option");
    option.setAttribute("key", ID);
    option.value = name;
    return option;
}

export default createClientOption;