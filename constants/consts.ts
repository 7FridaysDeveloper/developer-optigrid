import { BlogPost } from "@/types/blog";
import { LeadershipMember, Partner, StatData } from "@/types/shared";

export const PARTNERS = [
  { src: "/partners/unsw_red.png", alt: "UNSW", width: 66, height: 69 },
  { src: "/partners/cefc.webp", alt: "CEFC", width: 55, height: 55 },
  { src: "/partners/wv_forest.png", alt: "Virescent", width: 52, height: 55 },
  { src: "/partners/ipgroup.png", alt: "IP Group", width: 127, height: 55 },
  {
    src: "/partners/hostplus.png",
    alt: "Hostplus",
    width: 70,
    height: 56,
  },
  {
    src: "/partners/the_university_of_adelaide.png",
    alt: "The University of ADELAIDE",
    width: 75,
    height: 56,
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    title: "Optimising Price Forecasting in Volatile Electricity Markets",
    excerpt:
      "Machine learning models have been widely used for price forecasting in various contexts. Yet, in electricity markets, they often fail to deliver meaningful insights that lead to significant performance...",
    date: new Date("Oct 01, 2024"),
    image: "/blogs/AdobeStock_591563892-scaled-e1742131393528-2048x1800.webp",
    thumb: "/blogs/AdobeStock_591563892-scaled-e1742131393528-233x140.webp",
    slug: "optimising-price-forecasting-in-volatile-electricity-markets",
    author: "OptiGrid Team",
    readTime: "5 min read",
    tags: ["Insights"],
    category: ["Insights"],
    content: `
<div class="single-text">
             <p style="text-align: left;">Machine learning models have been widely used for price forecasting in various contexts. Yet, in electricity markets, they often fail to deliver meaningful insights that lead to significant performance improvements beyond analytical models. As the share of renewables grows, alongside the inherent volatility driven by fluctuating demand, weather, and other external factors, effective forecasting of electricity prices is becoming increasingly important. Accurate price forecasts enable market participants to optimise bidding strategies and improve resource allocation, ultimately enhancing the operational efficiency of energy assets.</p>
<p>&nbsp;</p>
<p style="text-align: left;">Research conducted in 2021 and 2022 by OptiGrid’s founders introduced unique methodologies for electricity price forecasting, focusing on the importance of effective data processing and the use of fit-for-purpose models when using machine learning. A key takeaway of the research is the critical role of data pre-processing and the need for models specifically tailored to each market’s unique conditions.</p>
<p style="text-align: left;">The Australian National Electricity Market (NEM), known for its significant price volatility, presents unique forecasting challenges. The research shows how tailored filtering and processing techniques during model training can lead to more accurate predictions, particularly for capturing price dynamics across different quantiles. Additionally, ensemble forecasting methods and quantile regression averaging demonstrated superior accuracy compared to traditional point forecasts.</p>
<p>&nbsp;</p>
<p style="text-align: left;">The research further emphasises that no single model performs best under all conditions. By utilising a combination of models trained on different time windows, market participants can ensure better adaptability during both stable and volatile periods. This multi-model approach enhances forecast robustness across various market conditions.</p>
<p>&nbsp;</p>
<p style="text-align: left;">By applying well-processed data and fit-for-purpose models, energy market participants can improve decision-making, optimise resource management, and increase overall market efficiency.</p>
<p style="text-align: left;">You can read the full text of the paper <a href="https://www.sciencedirect.com/science/article/pii/S0169207023001358">here</a>. If you’d like to learn more about our research and price forecasting solutions, and how they can support your business, feel free to reach out to us. We’d love to hear from you!</p>
<p style="text-align: left;">
        </p></div>
    `,
  },
  {
    title:
      "Over-estimating Battery Capacity: How Inaccurate Assumptions Skew Power System Studies",
    excerpt:
      "Garbage in, garbage out! Inaccurate assumptions in modelling can significantly skew the outcomes of power system and market studies. Yet, obtaining precise input data for battery storage systems is...",
    date: new Date("Oct 04, 2024"),
    image: "/blogs/blog2-1.png",
    thumb: "/blogs/blog2-1-233x140.png",
    slug: "overestimating-battery-capacity-how-inaccurate-assumptions-skew-power-system-studie",
    author: "OptiGrid Team",
    readTime: "5 min read",
    tags: ["Battery", "Power", " System"],
    category: ["Insights"],
    content: `
Garbage in, garbage out! Inaccurate assumptions in modelling can significantly skew the outcomes of power system and market studies. Yet, obtaining precise input data for battery storage systems is often challenging. Take the Hornsdale Power Reserve in South Australia, for example. While many studies might use its 194 MWh nameplate capacity as the input, it typically operates within only an 80 MWh range. This reliance on nominal capacities can lead to overly optimistic outcomes in both financial and operational studies.

 

The graph below illustrates the typical operating energy levels for Hornsdale and Lake Bonney BESS in South Australia, clearly showing the gap between their operational ranges and nameplate capacities. This visualisation was derived by applying our newly developed algorithm to the telemetered data of these batteries for the first 6 months of 2023.



This algorithm was developed to accurately estimate operational characteristics, such as energy level and efficiency, of batteries and will be detailed in the research paper by OptiGrid founders. The research findings underscore the importance of accurate operational characteristics for financial and operational studies when considering battery storage systems.

If you’d like to learn more about our research or have any questions about estimating battery characteristics and performance, feel free to reach out to us! We’d love to hear from you.
 

The research further emphasises that no single model performs best under all conditions. By utilising a combination of models trained on different time windows, market participants can ensure better adaptability during both stable and volatile periods. This multi-model approach enhances forecast robustness across various market conditions.

 

By applying well-processed data and fit-for-purpose models, energy market participants can improve decision-making, optimise resource management, and increase overall market efficiency.

You can read the full text of the paper here. If you’d like to learn more about our research and price forecasting solutions, and how they can support your business, feel free to reach out to us. We’d love to hear from you!
    `,
  },
  {
    title:
      "Predictability of regions’ renewable resources has a material impact on project profits",
    excerpt:
      "While many forecasting tools have been developed to improve forecasts of renewable generation, their accuracy is limited by the inherent predictability of the data used – that is, how predictable the renewable resource is in...",
    date: new Date("Oct 13, 2024"),
    image: "/blogs/blog4-1.png",
    thumb: "/blogs/blog4-1-233x140.png",
    slug: "predictability-of-regions-renewable-resources-has-a-material-impact-on-project-profits",
    author: "OptiGrid Team",
    readTime: "5 min read",
    tags: ["Predictability", "resources"],
    category: ["Insights"],
    content: `
While many forecasting tools have been developed to improve forecasts of renewable generation, their accuracy is limited by the inherent predictability of the data used – that is, how predictable the renewable resource is in different regions and times of the year. Here we explain explains why predictability matters and how considering it can save consumers and investors millions of dollars. The results and findings are based on research OptiGrid founders conducted in 2022 and 2023 at the University of Adelaide and CSIRO.

 

In today’s power systems, many short- and long-term decisions depend on the forecasts of solar and wind generation. Consequently, millions of dollars have been poured into the development of cutting-edge forecasting tools, designed to predict the output of these renewable energy sources, which hinge on weather conditions.

 

Although numerous sophisticated forecasting methods have emerged to enhance the accuracy of these predictions, they all share one fundamental constraint: the “inherent predictability” of the data used. In this context, predictability refers to the ability to determine, ahead of time, the availability of a generation resource [1]. When the predictability of a renewable resource is low, forecasting errors become more likely, whereas high predictability makes forecasting easier, regardless of the model employed.

 

Interestingly, our recent analysis of PV generation and solar irradiance data from Australia revealed that predictability can vary dramatically across different locations and times. This variability in predictability has far-reaching implications, as it can lead to additional charges for renewable plants and pose technical challenges for grid operations.

 

Recognising this, it becomes essential to incorporate predictability into relevant decision-making processes. By doing so, we can optimise the integration of renewables into the grid, reduce costs, and maintain a reliable power system.

How can we measure predictability?
While lower forecast errors could imply higher predictability in a given time series, they cannot be used as a surrogate parameter for predictability for many reasons. In our recently published research paper, we presented a new methodology for quantifying renewable data predictability, using weighted permutation entropy (WPE).

 

We define the predictability index as 1-WPE, where a lower WPE indicates higher predictability, and vice versa. In the following, we provide several examples of how using this metric can improve power system decisions.

Application 1: Private investment decisions
When finding the optimal location for constructing solar and wind farms, various factors — such as solar or wind energy atlases, geographic information system (GIS) data, transmission networks, and road access — are taken into account. The chosen location has significant implications on investment costs, energy yields, and even the facility’s participation in day-ahead and/or spot electricity markets.

 

Like conventional power plants, solar and wind farms face financial penalties for deviating from their market commitments. Such deviations are more likely for renewable plants, as their “fuel” depends on weather conditions. Consequently, errors in renewable generation forecasts can result in supply-demand imbalances within the power grid and financial penalties for renewable plants. For instance, in the Australian National Electricity Market (NEM), the operator uses regulation Frequency Control Ancillary Services (FCAS) to ensure the balance between supply and demand. The Australian Energy Market Operator (AEMO) then recovers the regulation FCAS costs from market participants by determining how much each has contributed to the need for this service, called the Causer Pays procedure. Figure 1 shows the share of regulation FCAS charges per terawatt-hour of produced energy for the NEM power plants based on fuel types in each quarter of 2020. While the total production (and hence revenue) of solar PV and wind farms was much less than coal- and gas-fired plants, the share of regulation FCAS charges for renewable plants was considerably higher than those for conventional power plants.


Figure 1. Normalised regulation FCAS costs in the NEM by type of power plant in 2020.

The main reason for higher regulation FCAS charges among solar farms is the significant prediction errors in their generation forecasts, which lead to higher Causer Pay factors (CPFs), based on which a specific percentage of the regulation FCAS costs are assigned to each power plant. Figure 2 depicts the relationship over time between the CPFs of six solar farms in New South Wales (NSW) and the predictability of PV generation in 2019. The predictability is determined based on two different datasets: 1) the historical generation of 100+ rooftop PV systems in NSW, obtained from Solar Analytics, and 2) five minute historical data of global tilted irradiance (GTI) at the six solar farm locations, downloaded from SolCast.

 

The figures demonstrate a strong negative correlation between the average CPF, and the predictability for the actual solar generation and the GTI of solar farms. This means when the generation predictability of a solar farm was higher, its CPF was lower. As the CPF is directly related to regulation FCAS charges, it is clear that higher predictability of generation would result in lower regulation FCAS costs allocated to the renewable plant.


Figure 2. Dependency of solar farms’ regulation market costs on the predictability of PV generation. (A lower WPE indicates higher predictability)

To quantify the monetary value of predictability, we estimated how much the CPF of a solar farm would decrease when there is a specific amount of increase in its predictability. The scatter plots in Figure 3.A illustrate the vivid relationship between the average predictability and the CPF of solar farms over two-month rolling windows. We further validated the results by analysing the relationship between the annual predictability of solar farms’ irradiance and their average CPF for a year in Figure 3.B.

 

In all scatter plots, the correlation was statistically significant, indicating a strong negative correlation between predictability and CPF. Additionally, the slope of the regressed lines is similar in all three cases, suggesting a robust relationship exists between the CPF and the predictability for the studied period. Using the most conservative estimate for the relationship between the CPF and the predictability, we could estimate a 0.1 increase in the predictability would reduce CPF by 0.272. Given that the average annual cost of the regulation market was about $85.6 million (USD 56.6 million) in the last five years, a 0.272 reduction in the CPF leads to roughly $233,000 lower cost of regulation FCAS each year.


Figure 3. Strong inverse correlation between the regulation market costs and the generation predictability of solar farms.

Figure 4 illustrates the changes in the predictability of solar PV generation in various locations in Australia. We can observe that the PV generation predictability varies significantly across different regions and even within each state, indicating that it is highly location-dependent. Based on the previous analysis, we can estimate that a 100 MW solar farm could lose roughly $900,000 of its revenue each year because of these differences in PV generation predictability (this would be 9% of its potential $10 million revenue).


Figure 4. Impact of location on the predictability of solar PV generation.

Case study of nine solar farm locations
To better understand the impact of considering PV generation predictability on the decision to build a solar farm, we conducted a case study on nine potential locations in NSW, shown in Figure 5. Our goal was to determine the best location for a hypothetical 51.8 MW solar farm in two different scenarios (51.8 is the average of six solar farms’ capacity from the previous analysis).

 

In the first scenario, the projected revenue of the solar farm was calculated based on the total solar energy yield, which is typically considered the main factor for estimating future revenue. In the second scenario, we considered both the revenue and the Causer Pays costs in calculating the projected net revenue of the farm.


Figure 5. Annual solar irradiance and predictability values of (potential) solar farms in NSW.

To compare the expected net revenue of the solar farm in different locations for the two scenarios, we used the GTI sun-tracking data of locations shown in Figure 5 from August 2021 to August 2022. We set location 1, where the White Rock solar farm is installed, as our baseline in the comparison.

 

Based on the historical data, the White Rock solar farm had an annual revenue of about $10,000 per MW installed capacity in 2020. Accordingly, we calculated the revenue of a 51.8 MW solar farm in other locations, assuming a 1% higher annual GTI would lead to 1% more revenue. Also, we used the quantitative relationship between the predictability and CPF, mentioned in the previous analysis, to estimate the monetary value of better predictability.

 

Finally, the net revenue of the solar farm in different locations is compared in Figure 6. As seen in the figure, location nine would be the best option for building a 51.8 MW solar farm without considering the predictability.

 

However, if the cost associated with the predictability of PV generation were taken into account, location five would be the best option by a significant margin over location nine. Once predictability is considered in the solar farm investment decision, the ranking of the choices changes significantly in relation to the highest net revenue. These findings indicate the generation predictability of renewable plants has a material impact on their profit.


Figure 6. Impact of considering the predictability in choosing the best location for building a solar farm.

To find the best locations for future solar and wind farm projects, we need to take into account the cost implications of their resource predictability as a decisive factor, in addition to the other technical and financial factors currently being used. This can be done by measuring the predictability of the potential renewable generation at a location, using the existing (or simulated) generation data or relevant surrogate variables, such as GTI for solar farms.

Application 2: Policy design
The unpredictability of renewable generation, caused by inherently uncertain weather forecasts, has increased the costs of reserve electricity markets. For instance, the UK power grid experiences a 5 to 10 British Pounds per MWh increase in the reserve market costs for 1 MW additional wind or solar production due to their prediction errors. As the number of renewable plants increases in the electricity grid, the additional cost of operational reserve requirements per MWh of renewable energy will rise even more. Given that consumers (or taxpayers) pay for these costs on their electricity bills (or government subsidies), governments are responsible for minimising these costs through well-planned investments and shrewd policy design.

 

In November 2021, South Australia (SA) became the first gigawatt-scale power grid in the world to reach zero net demand when the combined output of rooftop solar and other small-scale generators exceeded the total customers’ load demand. This has been achieved mainly by the federal government’s subsidies on rooftop PV panels as well as state government policies. Despite all the benefits, the high level of distributed PV generation has led to higher variability of power system net demand, which can cause high spot energy prices, voltage swings, or even loss of supply if not adequately managed. One well-known solution is to integrate costly battery storage systems in the grid. Yet, a cheaper but effective way to mitigate some of these issues is to invest in renewable energy sources with higher generation predictability.

 

In this regard, recognising the differences in the predictability of renewable generation in different areas could change the public sector policies for the better long-term. For instance, as shown in Figure 7, northern SA with the highest predictability has an average density of rooftop PV systems equal to 41.5%, comparable with the south (40%) with significantly lower predictability. A better policy could have been offering different incentives in different regions based on their predictability, e.g., rooftop PV only in the northern part of the state and PV plus battery in the south.


Figure 7. Predictability and density of rooftop PV generation in SA.

On a larger scale, considering the predictability of renewable resources as a factor in the decision-making processes can enhance strategies for incorporating increased levels of renewable energy generation. For instance, the lower predictability of PV generation in Victoria suggests increasing rooftop solar in that region will increase net demand (operational demand) uncertainty compared to other states, which in turn requires a higher amount of operational reserve requirements in the power grid; hence, higher cost of energy for consumers. This can shape the policies and regulations to push for alternative renewable generation (e.g., small-scale wind turbines) instead of rooftop PV or subsidies on home battery systems in that region.

Application 3: Power system operation and planning
Looking into the predictability variations over time reveals interesting seasonality patterns in solar generation predictability that can be useful in power system planning and operation.


Figure 8. Different patterns of changes in PV generation predictability over time in different states of Australia.

Figure 8 presents the predictability profiles of the rooftop PV generation in three Australian states: NSW, Victoria and SA. In these figures, each line represents the predictability profile of an Australian household rooftop system over the year 2019, calculated based on two-month rolling windows.

 

It can be seen that the evolution of predictability over time varies remarkably from one state to another. This finding has potential applications in power systems planning, e.g., to jointly plan future flexibility resources (such as batteries or pumped hydro storage) and interconnections between states to share flexibility capacity in different seasons. For example, the PV generation predictability is the lowest in NSW during the summer while the highest in SA during the same period. In the event of proper interconnection between the two states (e.g., through the incoming interconnector), the flexible assets, such as batteries, in SA can assist in managing the higher renewable generation unpredictability in the NSW grid.

 

The average predictability of solar generation in each state can also inform power system operators and market participants in determining the time frame for the annual maintenance of their assets, ensuring the availability of enough reserve requirements when renewable resources have lower predictability. Lastly, acknowledging that the maximum capability of forecast methods varies in different states over time can advise power system operators regarding the forecasting accuracy of renewable sources in different areas; thus, better estimations for required frequency regulation requirements in the system.

Concluding remarks
In most electricity markets, renewable plants are currently subject to different rules than conventional ones. For example, in the NEM, conventional generators (categorised as “scheduled”) are non-compliant with the rules if their generation deviates from the instructed dispatch targets considerably; renewable plants (categorised as “semi-scheduled”) are not. As most coal power plants are expected to retire in the next few years, the existing market rules are going through massive changes to ensure reliable grid operation. Such changes could imply if renewable plants’ generation were not predictable, they would need to maintain sufficient headroom to accommodate unpredictable generation changes and meet their forecasts. This would of course result in spilling a high portion of their clean energy and earning less revenue. Selecting locations with high renewable resource predictability for future renewable projects will minimise these risks.

 

As electricity generation and consumption undergo significant transformations, both are becoming increasingly unpredictable. As a result, accurately estimating and considering the predictability of renewable resources has become more crucial than ever. Although forecasting models play an essential role, they will never be perfect. Therefore, it is vital to address the other half of the problem: the inherently limited predictability of intermittent generation sources. By measuring this property of renewable resources, policymakers, investors, power system planners and operators, and third-party service providers in the electricity industry can gain valuable insights for improved decision-making.

You can find the full text of the research paper here. If you’d like to learn more about our research and how our solutions can support your renewable energy projects, feel free to reach out to us. We’d love to hear from you!
    `,
  },
  {
    title: "Challenges in Unlocking the Full Value of Batteries in the NEM",
    excerpt:
      "Utility-scale batteries have become increasingly central to Australia’s National Electricity Market (NEM) and electricity grids worldwide. However, despite their potential, many of the batteries are not yet realising their...",
    date: new Date("Oct 22, 2024"),
    image: "/blogs/blog2-1.png",
    thumb: "/blogs/AdobeStock_459298034-233x140.webp",
    slug: "challenges-in-unlocking-the-full-value-of-batteries-in-the-nem",
    author: "OptiGrid Team",
    readTime: "5 min read",
    tags: ["Batteries", "electricity"],
    category: ["Insights"],
    content: `
Utility-scale batteries have become increasingly central to Australia’s National Electricity Market (NEM) and electricity grids worldwide. However, despite their potential, many of the batteries are not yet realising their full value.

 

A recent paper authored by our CEO, Sahand Karimi, sheds light on the operational challenges that limit the revenue potential of batteries in the NEM. This blog post distils key insights from that research, highlighting the significant unrealised opportunities in battery operations, and explores ways to overcome these issues.

Why Battery Operations are Unique
Operating batteries on the electricity grid is uniquely challenging compared to traditional generation sources. For instance:

While gas and coal plants have extensive fuel reserves, and wind and solar depend on natural elements, batteries are “fuel-limited”, storing only 1-4 hours of energy at full capacity. This means their revenue is highly sensitive to precisely when they are charged and discharged, hence short-term fluctuations in electricity prices.
Unlike traditional plants, batteries must acquire their fuel (i.e., electricity) in real time from the volatile 5-minute electricity market.
Batteries also participate in multiple markets simultaneously, including the energy and ancillary services markets, and offer network support services. Engaging in one market can limit the battery’s ability to generate revenue in others and has specific impacts on its cycling and degradation.
 

These factors coupled with their operational constraints increase the complexity of managing batteries compared to other energy assets, making sophisticated optimisation tools crucial for their efficient operation.

Modelling the Potential: What Could Batteries Achieve?
The research by Sahand and collaborators from the University of Adelaide and CSIRO demonstrates that a large portion of potential revenue is being missed by utility-scale batteries due to suboptimal dispatch strategies. It shows that up to half of the potential energy arbitrage revenue is not being realised.

 

Using advanced modelling techniques, the research compared actual battery revenue in the NEM with what they could theoretically achieve under perfect market information. Importantly, this involved considering the physical and operational characteristics of batteries, such as their state of charge limits, round-trip efficiency, self-discharge current and the amount of battery capacity used in the market. These were derived by an algorithm that uses AEMO’s 4-second SCADA data, recording the operational output of the batteries, and validated against the self-reported state of charge from some batteries.

 

Figure 1 Example of operational characteristics derived from 4-second SCADA data
Figure 1 Example of operational characteristics derived from 4-second SCADA data

Considering these operational characteristics and other technical and regulatory constraints, a Mixed-Integer Linear Programming (MILP) model (a mathematical optimisation technique) was used to simulate what these batteries could achieve with optimal bids under the same operational constraints over a 6-month period.


Figure 2 Comparing actual revenue to perfect information revenue of batteries over a 6-month period

The results highlight the potential for revenue improvement if dispatch decisions were optimised. While most of the frequency control ancillary services (FCAS) revenue were realised, there was a large gap between actual and maximum potential energy revenue. Operators only captured 40-60% of potential revenue in the energy spot market. With FCAS revenues decreasing over as new batteries come online, revenue from the volatile and harder-to-predict spot energy market will become increasingly important.


Figure 3 Monthly breakdown comparing actual revenue to perfect information revenue for four batteries over a 6-month period

Insights Into Potential Improvements
The study also emphasises the critical role of price forecasting. As price forecasts improve, so do battery revenue outcomes. Current pre-dispatch price signals from AEMO sometimes fail to capture the real-time volatility of the market, leading to missed revenue opportunities, especially during the days with many price spikes. A sensitivity analysis conducted on the Lake Bonney battery shows that relying solely on pre-dispatch prices can result in substantial financial losses compared to more accurate price forecasts.

 

To address this, advanced price forecasting and optimisation tools are essential. These technologies would allow operators to make better-informed decisions about when to charge and discharge their batteries, maximising their revenue potential.

Why This Matters Beyond Revenue
While improved battery optimisation directly benefits operators, the broader impact on the electricity grid and the energy transition is equally important. Batteries are often described as the “Swiss Army knife” of the grid due to their versatility. When operated efficiently, they provide services that stabilise the grid, facilitate the integration of renewable energy, and defer costly infrastructure investments. These theoretical outcomes can only become reality with sophisticated operations and optimisation technologies.

 

Better battery scheduling can also accelerate the energy transition by enabling more dispatchable power, which in turn encourages more variable renewable generators such as wind and solar to enter the grid.

And finally, with many new batteries supported by government underwriting through the Capacity Investment Scheme, the efficient operations of these batteries will reduce the financial risk of these underwriting schemes.

 

The Path Forward
As the research by Sahand makes clear, there is enormous potential to increase battery revenue through better optimisation, price forecasting, and operational modelling. These improvements are essential not only for battery operators to capture the full value of their assets but also for ensuring the efficiency of the broader grid as renewable energy takes on a larger role.

 

Moving forward, industry stakeholders must invest in the right tools and technologies to unlock the full potential of grid-connected batteries. Doing so will not only maximise financial returns on battery projects but will also contribute to a more reliable and sustainable energy grid for Australia.

 

The full study is publicly accessible here.

 

If you’d like to learn more about how advanced optimisation and price forecasting can unlock the full revenue potential of your batteries, we’d love to chat. Reach out to us at hello@optigrid.energy or connect with us on LinkedIn.
    `,
  },
  {
    title:
      "Backed by IP Group and CEFC, OptiGrid transforms battery economics through AI-enabled solutions",
    excerpt:
      "OptiGrid has recently closed a seed capital raise led by IP Group, with participation from the Clean Energy Finance Corporation (whose investment is managed by Virescent Ventures), University of...",
    date: new Date("Nov 17, 2024"),
    image: "/blogs/post-1.jpg",
    thumb: "/blogs/post-1.jpg",
    slug: "backed-by-ip-group-and-cefc-optigrid-transforms-battery-economics",
    author: "OptiGrid Team",
    readTime: "5 min read",
    tags: ["Investment", "News"],
    category: ["Insights"],
    content: `
OptiGrid has recently closed a seed capital raise led by IP Group, with participation from the Clean Energy Finance Corporation (whose investment is managed by Virescent Ventures), University of Adelaide, Impact Ventures, University of New South Wales, and Hostplus. This investment supports the launch of OptiGrid’s two innovative artificial intelligence and machine learning-driven energy management tools, which promise to transform the way power markets operate.

 

The two tools—OptiForecaster and OptiBidder—are designed to enhance efficiency and profitability in the energy sector. OptiForecaster delivers more accurate forecasts of wholesale electricity prices, while OptiBidder intelligently manages battery operation and market bidding, promising to increase revenue by over 25 percent. These solutions are tailored for utility-scale and distributed battery operators, energy retailers, and virtual power plants.

The launch follows publication of a peer-reviewed paper, co-authored by our co-founder and CEO Sahand Karimi, that shows batteries in the National Energy Market (NEM) miss out on 50 percent of their potential energy market revenue. This needs to change if batteries are to fulfil their role in stabilising a renewable power grid.

 

OptiGrid is a spin-out from University of Adelaide and its products have been developed in South Australia – a region with famously volatile electricity supply-demand, making it one of the most complex environments for trading in the wholesale electricity market.

 

Mr Karimi said improving battery revenue is critical to encouraging further investment in grid-connected batteries and accelerating the transition to a renewable power grid.

“Improved battery operation doesn’t just increase the financial returns of battery projects; its broader impact on the grid and the energy transition is equally important.

“When operated efficiently, batteries stabilise the grid, facilitate more renewables, and defer costly, often contentious infrastructure investments. They are, however, expensive investments, so these benefits only become a reality with sophisticated technologies that maximise batteries’ potential.”

 

Investment Manager at IP Group, Shane Meaney, said his company led the capital raise because of OptiGrid’s potential to maximise the performance of energy assets.

“Operators around the globe are trying to maximise the value of their energy trading and storage assets,” Mr Meaney said.

“Improving the efficiency of grids will bring prices down for consumers and accelerating the deployment of large-scale storage will move the grid to 100 percent renewables faster. We’re excited to be a major investor.”
    `,
  },
  {
    title: "Battery Revenues Shift Gears: Energy Market Takes the Lead in 2024",
    excerpt:
      "For the first time, batteries generated more than half of their total market revenue from the energy market in 2024 (70%). This is a significant shift, as FCAS markets...",
    date: new Date("Jan 17, 2024"),
    image: "/blogs/1734575000422_page-0001.webp",
    thumb: "/blogs/1734575000422_page-0001-233x140.jpg",
    slug: "battery-revenues-shift-gears-energy-market-takes-the-lead-in-2024",
    author: "OptiGrid Team",
    readTime: "5 min read",
    tags: [],
    category: ["Insights"],
    content: `
For the first time, batteries generated more than half of their total market revenue from the energy market in 2024 (70%). This is a significant shift, as FCAS markets had historically been the primary revenue stream for batteries in the NEM – yet their share of battery revenue has been on a steady decline since 2020.

 

Despite many new batteries coming online in the past two years, total FCAS market revenue has remained flat. This highlights the “shallow” nature of FCAS markets and increased competition as operational battery capacity grows. For instance, while the total operational capacity of batteries in the 6-sec and slower Raise Contingency markets now exceeds 800 MW, AEMO typically procures only 600–700 MW across all generation assets in these markets.

 

Still, battery market revenues in the NEM have surged. In 2024, their total market revenues grew by 101% compared to 2023, with more than $161 million generated in the energy market alone.

 

As anticipated by many experts, this confirms an important change in the distribution of battery market revenues between energy and FCAS. However, this also presents challenges for developers and operators, as energy market revenues are highly sensitive to fluctuating electricity prices and the complexities of energy market trading.




    `,
  },
  {
    title: "Longer-Duration Batteries Gain Ground in the NEM",
    excerpt:
      "Garbage in, garbage out! Inaccurate assumptions in modelling can significantly skew the outcomes of power system and market studies. Yet, obtaining precise input data for battery storage systems is...",
    date: new Date("Feb 02, 2024"),
    image: "/blogs/1739238148972.webp",
    thumb: "/blogs/1739238148972-233x140.jpeg",
    slug: "longer-duration-batteries-gain-ground-in-the-nem",
    author: "OptiGrid Team",
    readTime: "5 min read",
    tags: [],
    category: ["Insights"],
    content: `
Since 2022, NEM has seen a sharp increase in new utility-scale battery capacity, now totaling around 2 GW—more than half of which was added in just the past 18 months.

 

Almost all operational batteries in the NEM have durations of two hours or less, giving them a theoretical discharge window of up to two hours when fully charged. However, we’re now seeing a subtle but important shift toward longer durations, with more projects aiming for two hours and beyond.

 

Right now, the average duration in the NEM sits just above 1.5 hours, but if all committed and anticipated projects materialise (as listed by AEMO), that figure is expected to reach 2.3 hours by the end of 2027.

 

Several 4-hour systems drive this increase. These projects signal a growing appetite for deeper energy shifting—beyond merely capturing rare price spikes and FCAS revenues, to managing multiple high-price intervals and capitalising on daily price spreads, all while navigating offtake agreements.

 

Capturing these opportunities in the energy market is, of course, anything but straightforward. In future analyses, we’ll take a closer look at how battery operators are currently capturing these opportunities in practice.
    `,
  },
  {
    title: "The End of Contingency FCAS as a Revenue Source for Batteries?",
    excerpt:
      "Over the past year, prices in the Contingency FCAS markets have been on a steep downward trend, with average prices falling below levels deemed attractive by “price-setting” batteries. As...",
    date: new Date("Mar 05, 2024"),
    image: "/blogs/1739842079511_page-0001.webp",
    thumb: "/blogs/1739842079511_page-0001-233x140.webp",
    slug: "the-end-of-contingency-fcas-as-a-revenue-source-for-batteries",
    author: "OptiGrid Team",
    readTime: "5 min read",
    tags: [],
    category: ["Insights"],
    content: `
Over the past year, prices in the Contingency FCAS markets have been on a steep downward trend, with average prices falling below levels deemed attractive by “price-setting” batteries. As a result, the average enablement of some batteries like Victoria Big Battery and Hornsdale Power Reserve is now at historical lows.

 

Contingency FCAS markets pay for enablement (the readiness to respond) while energy delivery only occurs if a contingency event happens. However, FCAS enablement also means forgoing potential wholesale market revenue. When wholesale prices are “not interesting”, the cost of providing Contingency FCAS is essentially tied to the probability of being activated. Thanks to stable grid frequency in recent years, this means the cost is close to zero in most intervals.

 

Smaller batteries often bid at or near the floor price ($0/MW) to ensure they will be enabled in Contingency markets. But price-setting batteries don’t find those floor prices attractive enough to lower their own bids. As a result, their lowest bid price now exceeds the average prices, leading to significantly reduced enablement in Contingency markets.

 

Interconnector separations once delivered lucrative revenues from Contingency markets (earning $10 million in a week wasn’t unusual!), but with more batteries entering the market, the likelihood of potential price spikes is diminishing even under system separations.

 

As many anticipated, this signals a major shift in battery revenue streams. Wholesale market arbitrage and tolling agreements are becoming more important, yet they also bring new complexities arising from wholesale price volatility and the intricacies of real-time market optimisation and trading.

 

If you’d like to learn how OptiGrid is helping clients maximise returns on their battery projects, please get in touch.




    `,
  },
  {
    title:
      "Capturing Value: Inside the Real-World Performance of NEM Batteries",
    excerpt:
      "Price spreads are widely used to gauge the potential for batteries, and they’ve been on the rise in the NEM. But how much of that price spread are batteries...",
    date: new Date("Mar 12, 2025"),
    image: "/blogs/1740631771142_page-0001.webp",
    thumb: "/blogs/1740631771142_page-0001-233x140.webp",
    slug: "capturing-value-inside-the-real-world-performance-of-nem-batteries",
    author: "OptiGrid Team",
    readTime: "5 min read",
    tags: [],
    category: ["Insights"],
    content: `
Price spreads are widely used to gauge the potential for batteries, and they’ve been on the rise in the NEM. But how much of that price spread are batteries really capturing?

 

We calculated the “captured spread” for several NEM batteries, defined as the daily difference between the weighted average of discharge price and the weighted average of charge price. The graphs below illustrate our findings for 2024.

 

We compared the captured spread with the theoretical spread commonly used in various analyses. For each battery, we measured its operational duration and benchmarked it against the equivalent intraday price spread based on market prices. Results show some interesting patterns.

 

Notably, batteries sometimes capture a greater spread in months when the theoretical price spread is lower. This occurs because price spread overlooks the critical role of price volatility, which can dramatically impact battery performance and revenue capture.

 

Furthermore, battery optimisation and bidding strategies vary widely between assets. Even under similar market conditions, these differences can lead to significant variations in captured spread.

 

Ultimately, a more comprehensive method that incorporates price volatility and bidding system capabilities is essential to truly understand the market potential for batteries.  As market dynamics shift, optimising bidding strategies will be key to enhancing battery profitability and staying ahead in the evolving energy landscape.








    `,
  },
  {
    title:
      "Batteries Have a Limited Cycle Life – How Did Operators Spend Theirs in 2024?",
    excerpt:
      "Battery storage assets have a finite cycle life, with manufacturer warranties tied to specific throughput limits. To maximise lifetime value while meeting contractual obligations, operators carefully adjust their strategies,...",
    date: new Date("Mar 20, 2025"),
    image: "/blogs/1742163600092_page-0001.webp",
    thumb: "/blogs/1742163600092_page-0001-233x140.jpg",
    slug: "batteries-have-a-limited-cycle-life-how-did-operators-spend-theirs-in-2024",
    author: "OptiGrid Team",
    readTime: "5 min read",
    tags: ["Battery", "Power", " System"],
    category: ["Insights"],
    content: `
Battery storage assets have a finite cycle life, with manufacturer warranties tied to specific throughput limits. To maximise lifetime value while meeting contractual obligations, operators carefully adjust their strategies, balancing daily battery cycles against short-term and long-term market opportunities.

 

We recently analysed how different operators utilised their batteries across the NEM in 2024. Our analysis highlights the relationship between daily cycling behaviour and intraday price spreads, demonstrating how operators strategically respond to market conditions. The results show the different strategies operators implement through the optimisation parameters of their bidding systems.

 

Key observations:

– Batteries primarily used for hedging portfolio exposure showed a weak correlation between price spreads and daily cycling.

– Merchant batteries typically demonstrated a strong correlation, closely tracking price volatility.

– Batteries contracted for grid support services exhibited lower cycling during contracted periods.

 

Every battery asset is unique, and selecting the right operation strategy directly impacts financial returns. At OptiGrid, we don’t just provide an auto-bidding platform to optimise battery revenue on a daily basis – we work closely with our partners to deliver the insights needed to maximise the total lifecycle revenue of their assets.








    `,
  },
  {
    title: "Reflections from the Energy Storage Summit",
    excerpt:
      "How can developers and operators maximise merchant revenues from batteries? Last week at the Energy Storage Summit, our CEO, Sahand, joined five industry leaders on a panel to tackle...",
    date: new Date("Apr 10, 2025"),
    image: "/blogs/1743035110993.jpeg",
    thumb: "/blogs/1743035110993-233x140.jpeg",
    slug: "nem-price-volatility-and-merchant-revenues-reflections-from-the-energy-storage-summit",
    author: "OptiGrid Team",
    readTime: "5 min read",
    tags: [],
    category: ["Insights"],
    content: `
How can developers and operators maximise merchant revenues from batteries?
Last week at the Energy Storage Summit, our CEO, Sahand, joined five industry leaders on a panel to tackle this key question.

Merchant revenues now represent a prominent part of the battery revenue stack, and the conversations at the conference reflected a growing appetite for higher merchant exposure. From financiers to operators, the message was clear – more stakeholders across the BESS project lifecycle are leaning into merchant risk, not away from it.

On the panel, Sahand spoke about the importance of using advanced data science models to trade batteries more effectively in volatile markets like the NEM. He also shared OptiGrid’s perspective on how a robust battery optimiser can help developers and operators manage risks while maximising returns. In a landscape where predictability is limited and timing is critical, having the right optimisation tools and strategies is essential.

Beyond the panel, the conference featured many insightful discussions, but a few themes stood out:

The rapid evolution of virtual tolls and financial contracts
As the sector matures, more sophisticated financial arrangements are emerging – not just to monetise storage, but to better align incentives and manage exposure.

A stronger appreciation for the role of battery optimisers
There’s growing industry-wide recognition that battery optimisation is about more than just some smart algorithms. A highlight was hearing bankers talk about how different optimisers achieve varying levels of “Percentage of Perfect” revenue capture and how that significantly impacts battery returns. It’s encouraging to see this level of optimisation detail making its way into investment conversations.

 


Volatility: The Quiet Headliner
Although it wasn’t always the formal topic, price volatility came up in almost every session – from bankers to developers, operators to asset managers. The recurring narrative was simple:
more volatility means more opportunity for batteries.

While that’s partially true, we believe an important part of the story is often left out. Volatility is a double-edged sword. For example, intraday wholesale price volatility can lead to wider spreads and more extreme pricing events. But it also brings greater unpredictability and with that, more difficulty in consistently achieving a high “Percentage of Perfect” from battery operations.

Many in the industry seem to conflate “price volatility” with “price spreads” – or simply with more opportunities for batteries. While that can be true, higher volatility reduces the predictability of wholesale prices, which in turn makes revenue capture more challenging and increases the risk of missing significant revenue opportunities.

Beyond missed upside, volatility can also introduce downside risk when using storage to defend caps or hedge positions. In these cases, unpredictability doesn’t just erode returns, it can lead to real losses. With more volatility, capturing upside gets harder, and so does managing risk. The path to a reliable “Percentage of Perfect” gets murkier, not clearer.


    `,
  },
  {
    title: "Why Battery Dispatch Patterns Vary",
    excerpt:
      "Not all batteries play the same “game”.   Battery storage systems generate revenue through a mix of market and non-market mechanisms, including wholesale arbitrage, offtake agreements, capacity schemes, and...",
    date: new Date("Jun 03, 2025"),
    image: "/blogs/1749087364851_page-0001.jpg",
    thumb: "/blogs/1749087364851_page-0001-233x140.jpg",
    slug: "why-battery-dispatch-patterns-vary-and-what-that-means-for-revenue",
    author: "OptiGrid Team",
    readTime: "5 min read",
    tags: [],
    category: ["Insights"],
    content: `
Not all batteries play the same “game”.

 

Battery storage systems generate revenue through a mix of market and non-market mechanisms, including wholesale arbitrage, offtake agreements, capacity schemes, and more. Operational strategies are therefore shaped by the owner’s commercial objectives – whether it’s energy trading, risk hedging, or portfolio support.

 

To unpack this, we analysed the average hourly wholesale market revenue across several BESS assets over multiple months in 2024 and visualised the results as heatmaps (below). These charts give a snapshot of when in the day different batteries were dispatched and generated revenue.

 

As expected, most BESS assets discharged between 4-7pm, aligning with the evening peak, while charging typically occurred in the solar-rich midday hours and occasionally after midnight when prices were lowest.

 

But patterns vary across regions and ownership models. In Queensland, Bouldercombe BESS had the highest normalised market revenue in 2024, while in SA, Lake Bonney BESS led on this metric. Interestingly, gentailer-operated batteries in both regions showed different behaviour, often delaying discharge and maintaining a higher state of charge into the evening. This suggests a strategic use of storage as a hedge against late-evening volatility. We also observed months where grid support services shifted typical revenue patterns, reinforcing how contractual obligations influence battery dispatch.

 

Ultimately, while revenue maximisation is critical, optimisation platforms must go beyond short-term trading gains. Our platform, OptiBidder, integrates contract structures and aligns trading decisions with the operator’s commercial objectives – while ensuring the asset delivers strong returns over time.
    `,
  },
  {
    title: "New Record for BESS Energy Market Revenue",
    excerpt:
      "Yesterday evening delivered the longest run of extreme prices so far this winter. From 4 to 9 pm, every mainland region spent long stretches with prices mostly around $10,000/MWh,...",
    date: new Date("Jun 13, 2025"),
    image: "/blogs/1749787630083_page-0001.jpg",
    thumb: "/blogs/1749787630083_page-0001-233x140.jpg",
    slug: "new-record-for-bess-energy-market-revenue-during-nem-wide-scarcity-pricing",
    author: "OptiGrid Team",
    readTime: "5 min read",
    tags: [],
    category: ["Insights"],
    content: `
Yesterday evening delivered the longest run of extreme prices so far this winter. From 4 to 9 pm, every mainland region spent long stretches with prices mostly around $10,000/MWh, occasionally hitting the Market Price Cap. Sustained low wind generation right as demand ramped into the evening caused the reserve margin to erode, triggering extreme prices.

 

Most BESS across the NEM entered the afternoon fully charged and were able to discharge at full capacity when the price events hit. Across the NEM, total BESS energy market revenue exceeded $25 million, with several individual assets clearing more than $1 million each.

 

We looked at how different operators dispatched their batteries (all with a maximum 2-hour duration) across this long stretch of scarcity pricing. The charts below show how several batteries responded.

 

Most began discharging at full capacity as soon as prices neared $10,000, and many ran out of charge well before the end of volatility period. Gentailer-operated batteries, however, showed a different pattern, delaying discharge and maintaining a higher state of charge into the evening. In some occasions, they even passed up many $10,000/MWh intervals earlier on, holding energy so that they could respond to higher prices later in the evening.

 

This is a clear example of how winter demand combined with low wind can tighten the supply-demand balance and create extreme pricing events.

 

Want to track BESS performance across different assets and NEM regions? Check out OpenBESS, our free-access platform!
    `,
  },
  {
    title: "Hepburn selects OptiGrid to optimise their Wind-Battery Hybrid",
    excerpt:
      "We’re proud to share that OptiGrid has been selected by Hepburn Energy – Australia’s first community-owned wind farm – to optimise trading for their upcoming 5MWh battery, making it...",
    date: new Date("July 09, 2025"),
    image: "/blogs/1752016063363.jpeg",
    thumb: "/blogs/1752016063363-233x140.jpeg",
    slug: "hepburn-energy-selects-optigrid-to-optimise-first-of-its-kind-wind-battery-hybrid",
    author: "OptiGrid Team",
    readTime: "5 min read",
    tags: [],
    category: ["News"],
    content: `
We’re proud to share that OptiGrid has been selected by Hepburn Energy – Australia’s first community-owned wind farm – to optimise trading for their upcoming 5MWh battery, making it the first community-owned wind plus battery hybrid on the NEM.

 

Since 2011, Hepburn Energy has led the charge in community-powered renewables, helping Daylesford and surrounds become the first net-zero energy town in Australia. But like many renewable generators, they’ve faced increasing pressure from volatile wholesale prices and negative pricing events.

 

With our AI-powered OptiBidder platform, Hepburn Energy will soon be optimising dispatch and bidding for its wind-battery hybrid — increasing revenue, improving reliability, and helping the region stay on track for net-zero emissions by 2030.

 

OptiBidder uses our proprietary models and algorithms to forecast market prices, optimise trading, and maximise returns for batteries and renewables, while factoring in contractual obligations, market rules and technical limits. Whether Scheduled or Non-Scheduled, stand-alone or hybrid, OptiGrid is helping unlock new value for batteries in a rapidly evolving energy landscape.

 

Backed by IP Group PLC, Clean Energy Finance Corporation, Virescent Ventures, Uni of Adelaide, UNSW and EnergyLab, we’ve added over 40MW of assets to our platform in the past quarter — and we’re just getting started.

 

A huge thanks to Taryn Lane and the Hepburn Energy team for your trust and vision. Projects like this prove what’s possible when communities, innovation and the right tech come together.

 

Let’s maximise battery economics and accelerate the clean energy transition.
    `,
  },
];

export const STATS_DATA: StatData[] = [
  {
    id: "contracted-assets",
    value: 40,
    description: "Contracted Assets",
    unit: "MW+",
  },
  {
    id: "revenue-uplift",
    value: 50,
    description: "Revenue Uplift",
    unit: "%",
    startVal: 20,
  },
  {
    id: "model-rd",
    value: 5,
    description: "Model R&D",
    unit: " years",
    prefix: "+",
  },
];

export const PRODUCTS = [
  // {
  //   title: "OPEN BESS",
  //   description:
  //     "Data streaming from OpenNEM to power your market models and real-time dispatch strategies.",
  //   link: "/products/openbess",
  //   bgClass: "bg-[#111C29]",
  //   image: "/products/openbess.png",
  // },
  {
    title: "OPTI Bidder",
    description: `OptiBidder combines industry-leading price forecasting, proprietary bidding models, and a flexible interface—built for the Australian energy market and adaptable to your bidding strategy. Created by data science and energy market experts, it redefines how intelligent bidding should work.\n\nDiscover the next generation of electricity trading and energy asset optimisation with OptiBidder.`,
    link: "/products/optibidder",
    bgClass: "bg-[#233345]",
    image: "/products/openbess.png",
  },
];

export const CUSTOMERS: Partner[] = [
  {
    name: "CEFC",
    desktopImage: "/partners/cefc.webp",
    width: 55,
    height: 56,
    url: "https://www.cefc.com.au/",
  },
  {
    name: "UNSW",
    desktopImage: "/partners/unsw.png",
    width: 132,
    height: 56,
    url: "https://www.unsw.edu.au/",
  },
  {
    name: "SA Power Networks",
    desktopImage: "/partners/sa_power.png",
    width: 91,
    height: 44,
    url: "https://www.sapowernetworks.com.au/",
  },
  {
    name: "Hepburn Energy",
    desktopImage: "/partners/hepburm_energy.webp",
    width: 115,
    height: 44,
    url: "https://hepburnenergy.com.au/",
  },
  {
    name: "Virscent",
    desktopImage: "/partners/wv_forest.png",
    width: 53,
    height: 55,
    url: "https://virscent.com/",
  },
];

export const TIMELINEDATA = [
  {
    year: "2018",
    title: "The Realisation",
    description:
      "Co-Founder Ali Pourmousavi saw that utility-scale batteries needed smarter systems to succeed—accurate price forecasts and efficient, low-degradation operations.",
  },
  {
    year: "2020",
    title: "Early Research Phase",
    description:
      "Two research tracks began: one on price forecasting, the other on battery optimisation.",
  },
  {
    year: "2022",
    title: "Growth & Development",
    description:
      "These efforts merged into OptiGrid’s mission: unlocking the full potential of grid-connected batteries.",
  },
  {
    year: "2024",
    title: "OptiGrid is Born",
    description:
      "These efforts merged into OptiGrid’s mission: unlocking the full potential of grid-connected batteries.",
  },
];

export const OPENBESS_FEATURE_CARDS = [
  {
    icon: "/icons/chart_bar.svg",
    title: "Revenue Insights",
    description:
      "Information on energy and Frequency Control Ancillary Services (FCAS) market revenues for each individual BESS.",
    alt: "Revenue Insights",
  },
  {
    icon: "/icons/chart_board.svg",
    title: "Operational Metrics",
    description:
      "Data including battery power output, FCAS enablement, and battery cycling for better oversight.",
    alt: "Operational Metrics",
  },
  {
    icon: "/icons/settings.svg",
    title: "Market-wide Performance",
    description:
      "Insights into how each BESS is performing across the National Electricity Market (NEM).",
    alt: "Market-wide Performance",
  },
];

export const LEADERS: LeadershipMember[] = [
  {
    name: "Olivia Rhye",
    position: "Founder & CEO",
    description:
      "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
    imageSrc: "/leadership/olivia.jpg",
  },
  {
    name: "Phoenix Baker",
    position: "Engineering Manager",
    description:
      "Lead engineer with expertise in renewable energy systems and grid optimization.",
    imageSrc: "/leadership/phoenix.jpg",
  },
  {
    name: "Lana Steiner",
    position: "Product Manager",
    description:
      "Product strategy expert focused on energy market solutions and user experience.",
    imageSrc: "/leadership/lana.jpg",
  },
  {
    name: "Candice Wu",
    position: "Backend Developer",
    description:
      "Full-stack developer specializing in scalable energy management platforms.",
    imageSrc: "/leadership/candice.jpg",
  },
  {
    name: "Drew Cano",
    position: "UX Researcher",
    description:
      "User experience researcher focused on energy industry interfaces and workflows.",
    imageSrc: "/leadership/drew.jpg",
  },
  {
    name: "Orlando Diggs",
    position: "Customer Success",
    description:
      "Customer success specialist helping energy companies maximize their asset performance.",
    imageSrc: "/leadership/orlando.jpg",
  },
];
