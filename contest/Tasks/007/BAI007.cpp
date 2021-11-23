#include <bits/stdc++.h>
#define maxn 1003
#define maxc 1000000003

using namespace std;

int n, u, Cnt;

int main()
{
    freopen("inp.txt", "r", stdin);
    freopen("out.txt", "w", stdout);
    cin >> n;
    for(int i=1; i<=n; i++)
        cin >> u, Cnt += u == 1;
    if(2 * Cnt > n) cout << "YES" << endl;
    else    cout << "NO" << endl;
}
