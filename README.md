# Smelly test

Smelly test is an extension that helps developers mitigate test smells in their test suites. Smelly test is focused on the
javascript/typescript ecosystem, for the backend and frontend.

## Why?

Test smells have been researched and are known for their negative impact on test code understanding and making maintenance
difficult. You might be wondering why another extension that focuses on test smells in the era of AI. This is a fair thought and
I had the same question while building the extension. However, the javascript/typescript ecosystem lacks such a tool to
help mitigate test smells in code bases out there. If we compare the Java ecosystem there are tools developed for that
for years in academic settings. If we start to dig into the frontend technologies for mitigating test smells it is even
worse. This extension provides an aid for that.

## Running smelly

### CLI

Smelly is available to run via [command line](https://github.com/marabesi/smelly-test/tree/main/cli)

### VsCode marketplace

Installing it from [VsCode marketplace](https://marketplace.visualstudio.com/items?itemName=marabesi.smelly-test)

### Programmatically

The [core of smelly](https://github.com/marabesi/smelly-test/tree/main/detector) is avaiable for usage as well, it allows tools to us the smell test detection engine.

## The research behind Smelly

This extension is one of the results of an ongoing research effort to navigate the intersection between the TDD
practice and test smell generation. Here are the publications behind it:

- [Patterns that make TDD harder an ebook from practitioners for practitioners](https://info.codurance.com/es/antipatrones-de-tdd-ebook)
- The research goal: [CISTI2023 - Towards a TDD maturity model through an anti-patterns framework](https://github.com/marabesi/publications/blob/main/preprint-towards-a-tdd-maturity-model-through-an-anti-patterns-framework-cisti-2023.pdf)
- The Literature Review: [Exploring the Connection between the TDD Practice and Test Smells—A Systematic Literature Review](https://github.com/marabesi/publications/blob/main/exploring-the-connection-between-the-tdd-practice-and-test-smells-a-systematic-literature-review.pdf)

You will find loads of resources available online to go deeper into the subject, however, if you are looking to
a curated list here goes:

- [A portion of the test smells (is not exhaustive via testsmells.org)](https://testsmells.org/pages/testsmells.html)

### Related projects

- [jnose for java](https://github.com/arieslab/jnose)
- [tsDetect](https://github.com/TestSmells/TSDetect)
- [PyNose for python](https://github.com/JetBrains-Research/PyNose)

## Related research

- [Evaluating Large Language Models in Detecting Test Smells](https://www.researchgate.net/publication/385118360_Evaluating_Large_Language_Models_in_Detecting_Test_Smells)
- [What we know about smells in software test code](https://pureadmin.qub.ac.uk/ws/portalfiles/portal/178657249/What_we_know_testing_embedded_SW_Nov_24.pdf)
- [Smells in software test code: A survey of knowledge in industry and academia](https://pureadmin.qub.ac.uk/ws/portalfiles/portal/178889150/MLR_Smells_in_test_code_Dec_9.pdf)
- [TERTS: Um tutor de ensino para refatoraç̃ao de test smells](https://www.researchgate.net/profile/Ivan-Machado-2/publication/382613188_TERTS_Um_tutor_de_ensino_para_refatoracao_de_test_smells/links/66e4044bb1606e24c2267715/TERTS-Um-tutor-de-ensino-para-refatoracao-de-test-smells.pdf)
- [Process smells in practice: an evaluative case study](https://link.springer.com/article/10.1007/s10664-025-10664-8)

## Want to keep up to date with the latest research?

[Papers of the Week](https://www.linkedin.com/newsletters/papers-of-the-week-6956357330917564416) is a newsletter that publishes weekly papers about software engineering favoring TDD, software testing and DevOps.
