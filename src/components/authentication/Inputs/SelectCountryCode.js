import React from 'react';
import PropTypes from 'prop-types';
import {
  InputLabel, FormControl, Select
} from '@material-ui/core';

const SelectCountry = (props) => {
  const { handleChange, Code } = props;
  return (
    <FormControl style={{ paddingBottom: '30px' }}>
      <InputLabel htmlFor="country-code">Code</InputLabel>
      <Select
        native
        required
        value={Code}
        name="Code"
        onChange={handleChange}
        inputProps={{
          name: 'Code',
        }}
      >
        <option value="" />
        <option value="+213">+213</option>
        <option value="+244">+244</option>
        <option value="+229">+229</option>
        <option value="+267">+267</option>
        <option value="+226">+226</option>
        <option value="+257">+257</option>
        <option value="+237">+237</option>
        <option value="+238">+238</option>
        <option value="+236">+236</option>
        <option value="+269">+269</option>
        <option value="+243">+243</option>
        <option value="+253">+253</option>
        <option value="+240">+240</option>
        <option value="+291">+291</option>
        <option value="+251">+251</option>
        <option value="+241">+241</option>
        <option value="+220">+220</option>
        <option value="+233">+233</option>
        <option value="+224">+224</option>
        <option value="+245">+245</option>
        <option value="+225">+225</option>
        <option value="+254">+254</option>
        <option value="+231">+231</option>
        <option value="+218">+218</option>
        <option value="+261">+261</option>
        <option value="+265">+265</option>
        <option value="+223">+223</option>
        <option value="+222">+222</option>
        <option value="+230">+230</option>
        <option value="+212">+212</option>
        <option value="+258">+258</option>
        <option value="+264">+264</option>
        <option value="+227">+227</option>
        <option value="+234">+234</option>
        <option value="+242">+242</option>
        <option value="+262">+262</option>
        <option value="+250">+250</option>
        <option value="+290">+290</option>
        <option value="+239">+239</option>
        <option value="+221">+221</option>
        <option value="+248">+248</option>
        <option value="+232">+232</option>
        <option value="+252">+252</option>
        <option value="+27">+27</option>
        <option value="+211">+211</option>
        <option value="+249">+249</option>
        <option value="+268">+268</option>
        <option value="+255">+255</option>
        <option value="+228">+228</option>
        <option value="+216">+216</option>
        <option value="+256">+256</option>
        <option value="+212">+212</option>
        <option value="+260">+260</option>
        <option value="+263">+263</option>
      </Select>
    </FormControl>
  );
};

SelectCountry.propTypes = {
  Code: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SelectCountry;
