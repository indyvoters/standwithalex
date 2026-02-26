import { createFileRoute } from '@tanstack/react-router'
import LandingHeader from '../components/LandingHeader'
import Footer from '../components/Footer'

export const Route = createFileRoute('/privacy')({
    component: Privacy,
})

function Privacy() {
    return (
        <div className="antialiased font-sans selection:bg-white selection:text-zinc-900 overflow-x-hidden bg-[#18181b] text-white min-h-screen">
            <LandingHeader />

            <main className="relative w-full max-w-4xl mx-auto pt-[200px] px-6 pb-24 flex flex-col">
                <h1 className="font-serif font-medium text-4xl md:text-6xl tracking-tight text-white mb-4 animate-fade-in-up">
                    Privacy Policy
                </h1>
                <p className="text-zinc-500 uppercase tracking-widest text-xs mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    Effective date: January 27, 2026
                </p>

                <div className="space-y-12 text-zinc-400 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <section>
                        <p>
                            Your privacy is very important to us. This privacy policy addresses how indyvoters.org and affiliated brands (collectively, "ICIPA" - Illinois Committee for Independent Political Action) collect and use information you provide. By visiting indyvoters.org (this "Site"), and providing your information to us, you agree to accept the practices described in this Privacy Policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white text-xl font-medium mb-4">Comments</h2>
                        <p className="mb-4">
                            When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor's IP address and browser user agent string to help spam detection.
                        </p>
                        <p>
                            An anonymized string created from your email address (also called a hash) may be provided to ICIPA to see if you are using it. After approval of your comment, your profile picture is visible to the public in the context of your comment.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white text-xl font-medium mb-4">Media</h2>
                        <p>
                            If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white text-xl font-medium mb-4">Cookies</h2>
                        <p className="mb-4">
                            A cookie is a small text file that is stored on a user's computer for record-keeping purposes. We use cookies to collect anonymous information about how you use this Site by setting and accessing cookies on your computer. These cookies track information such as how often you visit our Site, what pages you view, and where you go after you leave our Site. The cookies are not connected to your personal information. We recommend that you leave cookies turned on because they allow you to take advantage of some of this Site's features.
                        </p>
                        <p className="mb-4">
                            If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.
                        </p>
                        <p className="mb-4">
                            If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.
                        </p>
                        <p className="mb-4">
                            When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select "Remember Me", your login will persist for two weeks. If you log out of your account, the login cookies will be removed.
                        </p>
                        <p>
                            If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white text-xl font-medium mb-4">Web Beacon</h2>
                        <p>
                            Web beacons, or clear gifs, are tiny graphics with a unique identifier, similar in function to cookies, and are used to track the online movements of web users. In contrast to cookies, which are stored on a user's computer hard drive, web beacons are embedded invisibly on web pages. Web beacons help us better manage content on our Site by informing us what content is effective. We do not tie the information gathered by web beacons to your personal information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white text-xl font-medium mb-4">Security</h2>
                        <p>
                            The security of your personal information is important to us. When you provide sensitive information (such as a name, address, email), we encrypt that information using secure socket layer technology (SSL). We follow generally accepted industry standards to protect the personal information submitted to us, both during transmission and once we receive it. However, no method of transmission over the Internet, or method of electronic storage, is 100% secure. Therefore, while we strive to use commercially acceptable means to protect your personal information, we cannot guarantee the absolute security of such information. If you have any questions about security on our Site, please contact us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white text-xl font-medium mb-4">Embedded Content From Other Websites</h2>
                        <p className="mb-4">
                            Content on this site may include embedded content (e.g. videos, images, articles, comments, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.
                        </p>
                        <p>
                            These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white text-xl font-medium mb-4">Links to Other Sites</h2>
                        <p>
                            This Site may contain links to other sites that are not owned or controlled by us. Please be aware that we are not responsible for the privacy practices of such other sites. This privacy statement applies only to information collected by this Site. We encourage you to be aware when you leave our Site and to read the privacy statements of each and every Web site that collects personally identifiable information. This Privacy Policy does not cover any information that you disclose to such sites or that they may collect. The privacy policies of these other sites may be significantly different from this Privacy Policy. We are not responsible for the privacy practices of these other sites and cannot guarantee the security of any of your personal information collected there. This Site may enable you to post comments, reviews and other information on publicly available areas of this Site. Any information you post in these areas of this Site will be available to all of our users, so please use caution in disclosing any personal information when you post such comments, reviews or other information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white text-xl font-medium mb-4">Facebook</h2>
                        <p>
                            You may choose to share your activity on this Site with your friends on Facebook. A subset of your user activity on this Site, including your likes, purchases, Wishlist's and friends will automatically be shared to both your friends on Facebook and with your Facebook friends on this Site. Additionally, such activity will be visible to users on this Site who have a Facebook account but who might not be your friend on Facebook. The information you choose to share with your Facebook friends will be attributed to your Facebook account that was used to access this Site. Facebook's use of such information and any information it collects from your use of Facebook is governed by Facebook's Privacy Policy, ICIPA has no liability or responsibility for the privacy practices or other actions of Facebook that may be enabled within use of this Site. The use of information on this Site is governed by this Site's Privacy Policy. You understand and acknowledge that you have read and are familiar with this Site's Privacy Policy and Facebook's Privacy Policy. If you do not wish to share your activity on this Site with your friends on Facebook, you may adjust your sharing settings on this Site at any time to disable such sharing. You understand and acknowledge that if you adjust your settings to disable such sharing on Facebook, such activity may continue to be publicly available to other users on this Site, including users with Facebook accounts.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white text-xl font-medium mb-4">Reset Request Data</h2>
                        <p>
                            If you request a password reset, your IP address will be included in the reset email.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white text-xl font-medium mb-4">How Long We Retain Your Data</h2>
                        <p className="mb-4">
                            If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.
                        </p>
                        <p>
                            For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white text-xl font-medium mb-4">What Rights You Have Over Your Data</h2>
                        <p>
                            If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white text-xl font-medium mb-4">Children Under 13</h2>
                        <p className="mb-4">
                            Children under 13 may view this Site, but they cannot make a purchase or provide any personal information. This Site is not designed for children and we do not wish to collect personal information from children under 13. If you register with us and we discover that you are under 13, we will delete your account. You must be 18 or over to purchase any products from this Site. If a child under the age of 13 has provided us with personally identifiable information online, we ask that a parent or guardian contact us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white text-xl font-medium mb-4">Exclusion to This Privacy Policy</h2>
                        <p>
                            This Privacy Policy shall not apply to any unsolicited information you provide to ICIPA through this Site or through any other means. This includes, but is not limited to, information posted to any public areas of the Site, such as review sections and forums (collectively, "Public Areas"), any ideas for new products or modifications to existing products, and other unsolicited submissions (collectively, "Unsolicited Information"). All Unsolicited Information shall be deemed to be non-confidential and ICIPA shall be free to reproduce, use, disclose, distribute and exploit such Unsolicited Information without limitation or attribution.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white text-xl font-medium mb-4">California Residents</h2>
                        <p>
                            If you are a California resident and have an established business relationship with us, you can request a notice disclosing the categories of personal information we have shared with third parties, for the third parties' direct marketing purposes, during the preceding calendar year. To request a notice, please submit your request by contacting us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white text-xl font-medium mb-4">EU-US Privacy Shield Program</h2>
                        <p>
                            ICIPA complies with the EU-US Privacy Shield Framework as set forth by the U.S. Department of Commerce regarding the collection, use and retention of personal information from European Union member countries. ICIPA has certified that it adheres to the Privacy Shield Principles of Notice, Choice, Accountability for Onward Transfer, Security, Data Integrity and Purpose Limitation, Access, and Recourse, Enforcement and Liability. If there is any conflict between the policies in this Privacy Policy and the Privacy Shield Principles, the Privacy Shield Principles shall govern. To learn more about the Privacy Shield program, and to view our certification page, please visit https://www.dataprivacyframework.gov/
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white text-xl font-medium mb-4">Types of Data Collected Under the EU-US Privacy Shield</h2>
                        <p className="mb-4">
                            Personal data such as your name, email address, mailing address, credit card information, phone number and IP address are collected. This personal data is used for the following purposes: to process and fulfill orders, communicate with you about orders, any ICIPA marketing and sales, internal research, and compliance with federal, state and local laws and regulations. ICIPA also collects aggregate data such as your Site preferences, age, gender, geographical location, language, time zone, income and education. This aggregate data is used for the following purposes: marketing and sales activities, to optimize user experience for types of goods sold, internal research, partnerships or agreements with affiliates, agents and business partners, and to describe our Services to current and prospective business partners.
                        </p>
                        <p>
                            ICIPA may collect the following types of personal data: name, email address, mailing address, credit card information, phone number and IP address. The following aggregate data may also be collected: Site preferences, age, gender, geographical location, language, time zone, income, and purchase behavior.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white text-xl font-medium mb-4">Who We Share Information With Under the EU-US Privacy Shield</h2>
                        <p className="mb-4">
                            ICIPA may disclose personal and non-personally identifiable aggregate data with affiliates, subsidiaries, business partners, advertisers and vendors. The purpose for disclosure to affiliates, subsidiaries and business partners is to improve customer experience, for internal research and marketing and sales purposes. We may share information with advertisers and vendors to comply with lawful agreements and for advertising purposes. ICIPA retains potential liability in cases of onward transfer of information to third parties.
                        </p>
                        <p className="mb-4">
                            ICIPA may also be required to disclose personal information in response to a lawful request by public authorities, including to meet national security or law enforcement requirements.
                        </p>
                        <p>
                            Individuals will be notified by ICIPA in the event it uses or discloses information for a purpose other than that for which the information was originally collected or discloses information to a non-agent third party. Notice may take a variety of forms, including through amendments or modifications to this Privacy Policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white text-xl font-medium mb-4">Service Providers</h2>
                        <p className="mb-4">
                            We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.
                        </p>
                        <p>
                            These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white text-xl font-medium mb-4">Payment Processing and Donations</h2>
                        <p className="mb-4">
                            ICIPA uses Anedot, Inc. ("Anedot") as a third-party payment processor to facilitate donations and transactions on our site. When you make a donation or payment through our platform, you will be redirected to Anedot's secure payment processing system, where your payment information will be collected directly by Anedot.
                        </p>
                        <p className="mb-4">
                            When you make a donation or payment through Anedot, they may collect various types of information, including: account details (name, email, phone, address), payment and transaction data (method of payment, bank details, credit or debit card information, and transaction amounts), device information (hardware model, geo-location), and usage data related to the transaction process.
                        </p>
                        <p className="mb-4">
                            Anedot has committed to never selling your personal information and only sharing it with the organization you donated to (in this case, ICIPA). They use your information to process your transactions, communicate with you about your donation or payment, prevent fraud and comply with legal obligations, and provide and improve their services.
                        </p>
                        <p className="mb-4">
                            Anedot stores your data on secure servers in the United States and uses encryption and access controls to protect your information. They retain personal data only as long as necessary to fulfill their services or meet legal obligations, after which they delete or anonymize it.
                        </p>
                        <p>
                            You have the right to request access, correction, deletion, or portability of your personal data collected by Anedot by contacting them directly at help@anedot.com.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white text-xl font-medium mb-4">Additional Service Providers</h2>
                        <p>
                            In addition to our previously listed service providers, we want to specifically disclose our relationship with Anedot as a payment processor. As described above, when you make a donation or payment through our site, your transaction information will be processed by Anedot acting on our behalf. For more information about Anedot's privacy practices, you can view their privacy policy on their website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white text-xl font-medium mb-4">Data Sharing and Processing Agreements</h2>
                        <p>
                            ICIPA has entered into appropriate data processing agreements with Anedot to ensure that your information is handled in accordance with applicable privacy laws and regulations, including the EU-US Privacy Shield Framework. These agreements require Anedot to maintain appropriate security measures and to only process your data according to our instructions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white text-xl font-medium mb-4">Data Breach Notification</h2>
                        <p>
                            In addition to our existing security measures, we want to inform you that in the event of a data breach affecting information processed by Anedot on our behalf, they have established procedures to identify, contain, and mitigate the impact of the breach. Where required by law, affected individuals will be notified and the breach will be reported to relevant authorities within the specified timeframe.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white text-xl font-medium mb-4">Contact Us</h2>
                        <p>
                            If you would like to access, correct, amend or delete any personal information we have about you, please contact us.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    )
}
