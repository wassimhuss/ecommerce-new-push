
export class Proxy {
  constructor() {
    this.APIBaseUrl = 'http://localhost:5000/api/Data';
    this.url = '';
    this.Ticket = '';
    this.TicketMode = 'header';
  }
  api(url) {
    return fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }
  apiPost(url, data) {
    return fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        ticket: this.Ticket,
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    }).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }).catch(err => {
      // console.error(err);
      // setError(err);
    });
  }
  async Get_Product_By_OWNER_ID(i_Params_Get_Product_By_OWNER_ID) {
    this.url =
      this.APIBaseUrl +
      '/Get_Product_By_OWNER_ID?Ticket=' +
      (this.TicketMode === 'url' ? this.Ticket : '');
    const result = await this.apiPost(
      this.url,
      i_Params_Get_Product_By_OWNER_ID,
    ).then(async resp => {
      return resp;
    });
    return result;
  }
  async Get_Product_By_Where(i_Params_Get_Product_By_Where) {
    // console.error(i_Params_Get_Product_By_Where)

    this.url =
      this.APIBaseUrl +
      '/Get_Product_By_Where?Ticket=' +
      (this.TicketMode === 'url' ? this.Ticket : '');
    // console.error(this.url)
    const result = await this.apiPost(
      this.url,
      i_Params_Get_Product_By_Where,
    ).then(async resp => {
     // console.error(resp)
      return resp;
    });
    return result;
  }
  async Get_About_us_By_OWNER_ID(i_Params_Get_About_us_By_OWNER_ID) {
    // console.error(i_Params_Get_Product_By_Where)

    this.url =
      this.APIBaseUrl +
      '/Get_About_us_By_OWNER_ID?Ticket=' +
      (this.TicketMode === 'url' ? this.Ticket : '');
    // console.error(this.url)
    const result = await this.apiPost(
      this.url,
      i_Params_Get_About_us_By_OWNER_ID,
    ).then(async resp => {
     // console.error(resp)
      return resp;
    });
    return result;
  }
  async Get_Product_By_Where_Adv(i_Params_Get_Product_By_Where) {
    // console.error(i_Params_Get_Product_By_Where)
      this.url =
        this.APIBaseUrl +
        '/Get_Product_By_Where_Adv?Ticket=' +
        (this.TicketMode === 'url' ? this.Ticket : '');
        // console.error(this.url)
      const result = await this.apiPost(
        this.url,
        i_Params_Get_Product_By_Where,
      ).then(async resp => {
        return resp;
      });
      return result;
  }
  async Authenticate(i_Params_Authenticate) {
   //console.error(i_Params_Authenticate)
    this.url =
      this.APIBaseUrl +
      '/Authenticate?Ticket=' +
      (this.TicketMode === 'url' ? this.Ticket : '');
      // console.error(this.url)
      // console.error(i_Params_Authenticate)
    const result = await this.apiPost(
      this.url,
      i_Params_Authenticate,
    ).then(
      async resp => {
      return resp;
    }
    );
    return result;
  }
  async Edit_Product(i_Product) {
    this.url =
      this.APIBaseUrl +
      '/Edit_Product?Ticket=' +
      (this.TicketMode === 'url' ? this.Ticket : '');
    const result = await this.apiPost(this.url, i_Product).then(async resp => {
      return resp;
    });
    return result;
  }
  async Edit_Adress(i_Adress) {
    this.url =
      this.APIBaseUrl +
      '/Edit_Adress?Ticket=' +
      (this.TicketMode === 'url' ? this.Ticket : '');
    const result = await this.apiPost(this.url, i_Adress).then(async resp => {
      return resp;
    });
    return result;
  }
  async Edit_User(i_User) {
    this.url =
      this.APIBaseUrl +
      '/Edit_User?Ticket=' +
      (this.TicketMode === 'url' ? this.Ticket : '');
    const result = await this.apiPost(this.url, i_User).then(async resp => {
      return resp;
    });
    return result;
  }
  async Feetoura(i_Feetoura) {
    //console.log(JSON.stringify(i_Feetoura))
    this.url =
      this.APIBaseUrl +
      '/Feetoura?Ticket=' +
      (this.TicketMode === 'url' ? this.Ticket : '');
    const result = await this.apiPost(this.url, i_Feetoura).then(async resp => {
      return resp;
    });
    return result;
  }
  
  async Delete_Product(i_Params_Delete_Product) {
    this.url =
      this.APIBaseUrl +
      '/Delete_Product?Ticket=' +
      (this.TicketMode === 'url' ? this.Ticket : '');
    const result = await this.apiPost(this.url, i_Params_Delete_Product).then(
      async resp => {
        return resp;
      },
    );
    return result;
  }
  async Get_Adress_By_USER_ID(i_Params_Get_Adress_By_USER_ID) {
    this.url =
      this.APIBaseUrl +
      '/Get_Adress_By_USER_ID?Ticket=' +
      (this.TicketMode === 'url' ? this.Ticket : '');
    const result = await this.apiPost(
      this.url,
      i_Params_Get_Adress_By_USER_ID,
    ).then(async resp => {
      return resp;
    });
    return result;
  }
  async Get_Category_By_OWNER_ID(i_Params_Get_Category_By_OWNER_ID) {
    this.url =
      this.APIBaseUrl +
      '/Get_Category_By_OWNER_ID?Ticket=' +
      (this.TicketMode === 'url' ? this.Ticket : '');
    const result = await this.apiPost(
      this.url,
      i_Params_Get_Category_By_OWNER_ID,
    ).then(async resp => {
      return resp;
    });
    return result;
  }
  async Get_Category_By_Where(i_Params_Get_Category_By_Where) {
    this.url =
      this.APIBaseUrl +
      '/Get_Category_By_Where?Ticket=' +
      (this.TicketMode === 'url' ? this.Ticket : '');
    const result = await this.apiPost(
      this.url,
      i_Params_Get_Category_By_Where,
    ).then(async resp => {
      return resp;
    });
    return result;
  }
  async Edit_Category(i_Category) {
    this.url =
      this.APIBaseUrl +
      '/Edit_Category?Ticket=' +
      (this.TicketMode === 'url' ? this.Ticket : '');
    const result = await this.apiPost(this.url, i_Category).then(async resp => {
      return resp;
    });
    return result;
  }
  async Delete_Category(i_Params_Delete_Category) {
    this.url =
      this.APIBaseUrl +
      '/Delete_Category?Ticket=' +
      (this.TicketMode === 'url' ? this.Ticket : '');
    const result = await this.apiPost(this.url, i_Params_Delete_Category).then(
      async resp => {
        return resp;
      },
    );
    return result;
  }
  
  async Edit_Uploaded_file(i_Uploaded_file) {
    this.url =
      this.APIBaseUrl +
      '/Edit_Uploaded_file?Ticket=' +
      (this.TicketMode === 'url' ? this.Ticket : '');
    const result = await this.apiPost(this.url, i_Uploaded_file).then(
      async resp => {
        return resp;
      },
    );
    return result;
  }
  async Delete_Uploaded_file(i_Params_Delete_Uploaded_file) {
    this.url =
      this.APIBaseUrl +
      '/Delete_Uploaded_file?Ticket=' +
      (this.TicketMode === 'url' ? this.Ticket : '');
    const result = await this.apiPost(
      this.url,
      i_Params_Delete_Uploaded_file,
    ).then(async resp => {
      return resp;
    });
    return result;
  }
  async Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD(
    i_Params_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD,
  ) {
    this.url =
      this.APIBaseUrl +
      '/Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD?Ticket=' +
      (this.TicketMode === 'url' ? this.Ticket : '');
    const result = await this.apiPost(
      this.url,
      i_Params_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD,
    ).then(async resp => {
      return resp;
    });
    return result;
  }
}
export class Params_Get_Product_By_OWNER_ID {}
export class Product {}
export class Category {}
export class Uploaded_file {}
export class Params_Get_Product_By_Where {}
export class Params_Get_About_us_By_OWNER_ID {}
export class Params_Delete_Product {}
export class Params_Get_Category_By_OWNER_ID {}
export class Params_Get_Category_By_Where {}
export class Params_Get_Adress_By_USER_ID {}
export class Params_Delete_Category {}
export class Params_Authenticate{}
export class Params_Delete_Uploaded_file {}
export class Params_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD {}
export class Action_Result {}
export class Result_Get_Product_By_OWNER_ID extends Action_Result {}
export class Result_Get_Product_By_Where extends Action_Result {}
export class Result_Edit_Product extends Action_Result {}
export class Result_Delete_Product extends Action_Result {}
export class Result_Get_Category_By_OWNER_ID extends Action_Result {}
export class Result_Get_Category_By_Where extends Action_Result {}
export class Result_Edit_Category extends Action_Result {}
export class Result_Delete_Category extends Action_Result {}
export class Result_Edit_Uploaded_file extends Action_Result {}
export class Result_Delete_Uploaded_file extends Action_Result {}
export class Result_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD extends Action_Result {}
